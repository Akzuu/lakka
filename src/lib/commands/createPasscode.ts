import { customAlphabet } from 'nanoid';
import { ChatId } from 'node-telegram-bot-api';
import { sendMessage } from '../../components/bot/bot';
import { createPasscodeQuery } from '../../components/database/queries/passcodeQueries';
import { getUserStreamIdByTelegramChatId } from '../../components/database/queries/streamQueries';
import { StreamId } from '../../components/database/types/database.types';
import { log } from '../log';

const PASSCODE_VALID_FOR_MINUTES = 10;

// SEC_PRO: Six character long passcodes are not really secure, but they are
// easy for the users. To make sure that the codes can not be brute forced
// easily, the passcodes will only be valid for 10 minutes. If user tries
// wrong passcode more than tree times, 10 minute cooldown is issued where user
// is not able to try new passcodes
const generatePasscode = async (streamId: StreamId) => {
  const passcode = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();

  const dateNow = new Date();
  const validUntil = new Date(
    dateNow.getTime() + PASSCODE_VALID_FOR_MINUTES * 60000
  );

  await createPasscodeQuery({
    passcode,
    streamId,
    activeUntil: validUntil.toISOString(),
  });

  return passcode;
};

export const createPasscode = async (chatId: ChatId) => {
  let streamId: StreamId | undefined;
  try {
    streamId = await getUserStreamIdByTelegramChatId(chatId);
  } catch (error) {
    log.error(`Finding users current stream failed. ${error}`);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  if (streamId === undefined) {
    sendMessage(
      chatId,
      'Not able to find active stream. You can create a stream via /create'
    );
    return;
  }

  let passcode: string;
  try {
    passcode = await generatePasscode(streamId);
  } catch (error) {
    log.error(`Generating passcode failed. ${error}`);
    sendMessage(chatId, 'Unexpected error, please try again later!');
    return;
  }

  sendMessage(
    chatId,
    `Code: ${passcode} \n\nPasscode is valid for ${PASSCODE_VALID_FOR_MINUTES} minutes.`
  );
};
