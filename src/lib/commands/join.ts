import { ChatId } from 'node-telegram-bot-api';
import { sendMessage } from '../../components/bot/bot';
import {
  findStreamIdWithPasscode,
  insertFailedJoinAttempt,
  isUserBannedFromJoining,
} from '../../components/database/queries/passcodeQueries';
import { StreamId } from '../../components/database/types/database.types';
import { answerListener } from '../helpers/answerListener';
import { log } from '../log';

export const joinStream = async (chatId: ChatId) => {
  let userBannedFromJoining: boolean;

  try {
    userBannedFromJoining = await isUserBannedFromJoining(chatId);
  } catch (error) {
    log.error(`Finding ban status failed. ${error}`);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  if (userBannedFromJoining) {
    sendMessage(
      chatId,
      'Too many failed join attempts. Try again after 10 minutes'
    );
    return;
  }

  let passcode;
  try {
    passcode = await answerListener(chatId, 'Passcode?');
  } catch (error) {
    sendMessage(chatId, error as string);
    return;
  }

  let streamId: StreamId;
  try {
    streamId = await findStreamIdWithPasscode(passcode);
  } catch (error) {
    log.error(`Finding stream id with passcode failed. ${error}`);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  if (streamId === undefined) {
    try {
      await insertFailedJoinAttempt(chatId);
    } catch (error) {
      log.error(`Not able to insert record to fail table. ${error}`);
      sendMessage(chatId, 'Unexpected error, please try again later!');
      return;
    }

    sendMessage(chatId, `Invalid passcode`);
    return;
  }
};
