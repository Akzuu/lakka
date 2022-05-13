import { ChatId } from 'node-telegram-bot-api';
import { bot, sendMessage } from '../../components/bot/bot';
import {
  createStreamQuery,
  createUserLinkToStream,
} from '../../components/database/queries/streamQueries';
import { log } from '../log';
import knex from '../../components/database/knex';
import { answerListener } from '../helpers/answerListener';
import { confirmListener } from '../helpers/confirmListener';
import { findUserByTelegramChatId } from '../../components/database/queries/userQueries';
import {
  IUser,
  StreamId,
} from '../../components/database/types/database.types';

interface IStreamInfo {
  teamOne: string;
  teamTwo: string;
}

const streamInfoAsker = async (chatId: ChatId) =>
  new Promise(async (resolve, reject) => {
    try {
      const teamOne = await answerListener(chatId, 'First team name?');
      const teamTwo = await answerListener(chatId, 'Second team name?');
      // FIX_ME Removing reply listeners like this might fuck up the stream creation
      // process for other users trying to create a stream at the same time
      bot.clearReplyListeners();

      const confirm = await confirmListener(
        chatId,
        `Confirm teams: ${teamOne} - ${teamTwo}`
      );

      // FIX_ME see above comment
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
    streamInfo = (await streamInfoAsker(chatId)) as IStreamInfo;
  } catch (error) {
    sendMessage(chatId, error as string);
    return;
  }

  // Create transaction
  let trx;
  try {
    trx = await knex.transaction();
  } catch (error) {
    log.error(error);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  let streamId: StreamId;
  try {
    streamId = await createStreamQuery({}, trx);
  } catch (error) {
    trx.rollback();
    log.error(`Stream creation failed. ${error}`);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  let user: IUser;
  try {
    user = await findUserByTelegramChatId(chatId);
  } catch (error) {
    trx.rollback();
    log.error(`Finding user failed. ${error}`);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  if (user === undefined) {
    log.error(`Finding user failed.`);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  try {
    await createUserLinkToStream(
      {
        streamId,
        userId: user.id,
      },
      trx
    );
  } catch (error) {
    trx.rollback();
    log.error(`Stream creation failed. ${error}`);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  try {
    await trx.commit();
  } catch (error) {
    log.error(`Stream TRX commit failed. ${error}`);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  sendMessage(chatId, `Stream created! Overlay URL: https://TODO.TODO/TODO`);
};
