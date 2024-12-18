import { defineEventHandler, readBody } from 'h3'
import { some, isNil } from 'lodash-unified'

function escapeMarkdownV2(text: string) {
  return text.replace(/([_*[\]()~`>#+=|{}.!\\-])/g, '\\$1')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const botToken = config.telegramBotToken
  const chatId = config.telegramChatId

  const body = await readBody(event)

  const requiredFields = ['name', 'phone']

  if (some(requiredFields, (field) => isNil(body[field]))) {
    return { success: false, error: 'Text is required' }
  }

  const text = [
    '📝 *Новая заявка\\!*\n',
    `*Имя:* ${escapeMarkdownV2(body.name)}`,
    `*Телефон:* ${escapeMarkdownV2(body.phone)}`,
    body.message ? `*Сообщение:* ${escapeMarkdownV2(body.message)}` : '',
  ].join('\n')

  const payload = {
    chat_id: chatId,
    text,
    parse_mode: 'MarkdownV2',
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`

  try {
    await $fetch(url, {
      method: 'POST',
      body: payload,
    })

    return { success: true }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: false,
      error: 'Неизвестная ошибка',
    }
  }
})
