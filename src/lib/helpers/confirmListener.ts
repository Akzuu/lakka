import { ChatId } from 'node-telegram-bot-api';
import { bot } from '../../components/bot/bot';
import { QUESTION_ANSWER_TIMEOUT_SECONDS } from './answerListener';

export const confirmListener = async (
  chatId: ChatId,
  confirmationText: string
) =>
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
