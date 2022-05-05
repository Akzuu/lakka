import TelegramBot, { ChatId } from 'node-telegram-bot-api';
import { bot, sendMessage } from '../../components/bot/bot';
import { customAlphabet } from 'nanoid';
import {
  createPasscodeQuery,
  createStreamQuery,
} from '../../components/database/queries/stream/streamQueries';
import { log } from '../log';

const PASSCODE_VALID_FOR_MINUTES = 5;
const QUESTION_ANSWER_TIMEOUT_SECONDS = 120;

// SEC_PRO: Passcodes are not really secure, but there is no need to have super
// secure anways since they are only used for limited time.
// Perhaps there should be some kind of system limiting the possibility to brute
// force these anyway?
const generatePasscode = () => {
  const passcode = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();

  const dateNow = new Date();
  const validUntil = new Date(
    dateNow.getTime() + PASSCODE_VALID_FOR_MINUTES * 60000
  );

  // await createPasscodeQuery({})
};

const answerListener = async (
  chatId: ChatId,
  question: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(
      () => reject('Took too long to answer. Stream creation aborted.'),
      QUESTION_ANSWER_TIMEOUT_SECONDS * 1000
    );
    bot
      .sendMessage(chatId, question, {
        reply_markup: {
          force_reply: true,
        },
      })
      .then((sentMsg) => {
        bot.onReplyToMessage(chatId, sentMsg.message_id, (answer) => {
          resolve(answer.text ?? '');
        });
      });
  });

const confirmListener = async (chatId: ChatId, confirmationText: string) =>
  new Promise((resolve, reject) => {
    setTimeout(
      () => reject('Took too long to answer. Stream creation aborted.'),
      QUESTION_ANSWER_TIMEOUT_SECONDS * 1000
    );
    bot
      .sendMessage(chatId, confirmationText, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Confirm',
                callback_data: 'confirm',
              },
              {
                text: 'Edit',
                callback_data: 'edit',
              },
              {
                text: 'Cancel',
                callback_data: 'cancel',
              },
            ],
          ],
        },
      })
      .then((sentMsg) => {
        bot.addListener('callback_query', (reply) => {
          bot.editMessageReplyMarkup(
            { inline_keyboard: [] },
            { chat_id: chatId, message_id: sentMsg.message_id }
          );
          resolve(reply.data);
        });
      });
  });

const streamInfoAsker = async (chatId: ChatId) =>
  new Promise(async (resolve, reject) => {
    try {
      const teamOne = await answerListener(chatId, 'First team name?');
      const teamTwo = await answerListener(chatId, 'Second team name?');
      // FIX Removing reply listeners like this might fuck up the stream creation
      // process for other users trying to create a stream at the same time
      bot.clearReplyListeners();

      const confirm = await confirmListener(
        chatId,
        `Confirm teams: ${teamOne} - ${teamTwo}`
      );

      // FIX see above comment
      bot.removeAllListeners('callback_query');

      if (confirm === 'confirm') {
        resolve({
          teamOne,
          teamTwo,
        });
      } else if (confirm === 'cancel') {
        reject('Stream creation cancelled');
      } else {
        resolve(streamInfoAsker(chatId));
      }
    } catch (error) {
      reject(error);
    }
  });

export const createStream = async (chatId: ChatId, sender?: string) => {
  let streamInfo;
  try {
    streamInfo = await streamInfoAsker(chatId);
  } catch (error) {
    sendMessage(chatId, error as string);
    return;
  }

  console.log('Kissa');

  // let streamId;
  // const passcode = generatePasscode();

  // // TODO also create user in the same transaction
  // try {
  //   streamId = await createStreamQuery({
  //     leagueId: 1, // TODO Create leagues
  //   });
  // } catch (error) {
  //   log.error('Stream creation failed!', error);
  //   return;
  // }

  // const dateNow = new Date().toISOString();

  // sendMessage(
  //   chatId,
  //   `Stream created! Stream id is ${streamId} and the passcode is ${passcode}`
  // );
};
