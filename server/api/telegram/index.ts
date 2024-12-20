import { defineEventHandler, readBody } from 'h3'
import { sendTelegramMessage } from './telegram-api'
import { escapeMarkdownV2 } from './utils'
import type { TelegramResponse } from './types'
import { isNil } from 'lodash-unified'

export default defineEventHandler(async (event) => {
  if (event._method !== 'POST') {
    throw createError({ statusCode: 405, message: 'Method Not Allowed' })
  }

  const config = useRuntimeConfig()
  const { telegramBotToken: botToken, telegramChatId: chatId } = config

  const body = await readBody<{
    name?: string
    phone?: string
    message?: string
  }>(event)

  if (isNil(body?.name) || isNil(body?.phone)) {
    return { success: false, error: 'Имя и телефон обязательны' }
  }

  const text = [
    '📝 *Новая заявка\\!*\n',
    `*Имя:* ${escapeMarkdownV2(body.name)}`,
    `*Телефон:* ${escapeMarkdownV2(body.phone)}`,
    body.message ? `*Сообщение:* ${escapeMarkdownV2(body.message)}` : '',
  ].join('\n')

  try {
    const response = await sendTelegramMessage(botToken, chatId, text)

    if (response.ok) {
      return { success: true }
    }
  } catch (error) {
    if (error) {
      const telegramError = error as TelegramResponse

      return {
        success: false,
        error: `[${telegramError.error_code}]: ${telegramError.description}`,
      }
    } else {
      return {
        success: false,
        error: 'Ошибка при выполнении запроса',
      }
    }
  }
})
