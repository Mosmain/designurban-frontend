<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-lg font-bold mb-4">Отправка заявки</h1>
    <form class="space-y-4" @submit.prevent="sendMessage">
      <div>
        <label for="name" class="block text-sm font-medium">Имя:</label>
        <input
          id="name"
          v-model="form.name"
          class="w-full p-2 border rounded"
          type="text"
          required
        />
      </div>
      <div>
        <label for="phone" class="block text-sm font-medium">
          Номер телефона:
        </label>
        <input
          id="phone"
          v-model="form.phone"
          class="w-full p-2 border rounded"
          type="tel"
          required
        />
      </div>
      <div>
        <label for="message" class="block text-sm font-medium">
          Сообщение:
        </label>
        <textarea
          id="message"
          v-model="form.message"
          class="w-full p-2 border rounded"
          rows="4"
        />
      </div>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">
        Отправить
      </button>
      <div v-if="success" class="text-green-500 mt-2">
        Сообщение успешно отправлено!
      </div>
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { omitBy, isEmpty } from 'lodash-unified'

  const form = reactive({
    name: '',
    phone: '',
    message: '',
    reset() {
      Object.keys(this).forEach((key) => {
        if (typeof this[key] !== 'function') this[key] = ''
      })
    },
  })

  const success = ref(false)
  const error = ref(null)

  const sendMessage = async () => {
    success.value = false
    error.value = null

    try {
      const body = omitBy(form, (value) => isEmpty(value))

      const response = await $fetch('/api/telegram', {
        method: 'POST',
        body,
      })

      if (response.success) {
        success.value = true
        form.reset()
      } else {
        error.value = response.error
      }
    } catch (err) {
      error.value = err.message
    }
  }
</script>
