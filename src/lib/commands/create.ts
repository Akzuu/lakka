import { ChatId } from 'node-telegram-bot-api';
import { bot, sendMessage } from '../../components/bot/bot';
import { customAlphabet } from 'nanoid';
import { createStreamQuery } from '../../components/database/queries/stream/streamQueries';
import { log } from '../log';

// SEC_PRO: Passcodes are not really secure, but there is no need to have super
// secure anways since they are only used for limited time.
// Perhaps there should be some kind of system limiting the possibility to brute
// force these anyway?
const generatePasscode = () =>
  customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();

export const createStream = async (chatId: ChatId, sender?: string) => {
  let streamId;
  const passcode = generatePasscode();

  // TODO also create user in the same transaction
  try {
    streamId = await createStreamQuery({
      leagueId: 1, // TODO Create leagues
      passcode,
    });
  } catch (error) {
    log.error('Stream creation failed!', error);
    return;
  }

  sendMessage(
    chatId,
    `Stream created! Stream id is ${streamId} and the passcode is ${passcode}`
  );
};
