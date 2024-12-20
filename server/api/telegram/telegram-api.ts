import type { TelegramResponse } from './types'

export async function sendTelegramMessage(
  botToken: string,
  chatId: string,
  text: string,
): Promise<TelegramResponse> {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  return await $fetch<TelegramResponse>(url, {
    method: 'POST',
    body: {
      chat_id: chatId,
      text,
      parse_mode: 'MarkdownV2',
    },
    onResponseError: (context) => {
      throw context.response._data
    },
  })
}
