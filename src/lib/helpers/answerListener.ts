import { ChatId } from 'node-telegram-bot-api';
import { bot } from '../../components/bot/bot';

export const QUESTION_ANSWER_TIMEOUT_SECONDS = 120;

export const answerListener = async (
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
