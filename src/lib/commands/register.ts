import { ChatId } from 'node-telegram-bot-api';
import { bot, sendMessage } from '../../components/bot/bot';
import { createUserQuery } from '../../components/database/queries/userQueries';
import { answerListener } from '../helpers/answerListener';
import { log } from '../log';

interface IUserInfo {
  name: string;
}

const userInfoAsker = async (chatId: ChatId) =>
  new Promise(async (resolve, reject) => {
    try {
      // TODO GDPR!
      sendMessage(
        chatId,
        'Information provided WILL BE shown in the stream overlay! Provided information can be modified later.'
      );
      const name = await answerListener(chatId, 'Name?');
      // FIX_ME Removing reply listeners like this might fuck up the stream creation
      // process for other users trying to create a stream at the same time
      bot.clearReplyListeners();

      resolve({
        name,
      });
    } catch (error) {
      reject(error);
    }
  });

export const registerUser = async (chatId: ChatId) => {
  let userInfo;
  try {
    userInfo = (await userInfoAsker(chatId)) as IUserInfo;
  } catch (error) {
    sendMessage(chatId, error as string);
    return;
  }

  try {
    await createUserQuery({
      name: userInfo.name,
      telegramChatId: chatId,
    });
  } catch (error) {
    log.error(`User creation failed. ${error}`);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  sendMessage(chatId, `Registration process complete!`);
};
