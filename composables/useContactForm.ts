import { reactive, ref } from 'vue'
import { mapValues, omitBy, isEmpty } from 'lodash-unified'

export function useContactForm() {
  const form = reactive({
    name: '',
    phone: '',
    message: '',
    reset() {
      Object.assign(
        this,
        mapValues(this, (value) => (typeof value === 'function' ? value : '')),
      )
    },
  })

  const success = ref(false)
  const error = ref<string | null>(null)

  const sendMessage = async () => {
    success.value = false
    error.value = null

    try {
      const body = omitBy(form, (value) => isEmpty(value))

      const response = await $fetch<{ success: boolean; error?: string }>(
        '/api/telegram',
        {
          method: 'POST',
          body,
        },
      )

      if (response.success) {
        success.value = true
        form.reset()
      } else {
        error.value = response.error || 'Неизвестная ошибка'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Неизвестная ошибка'
    }
  }

  return {
    form,
    success,
    error,
    sendMessage,
  }
}
