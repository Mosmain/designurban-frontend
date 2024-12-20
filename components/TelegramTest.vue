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
  import { useContactForm } from '~/composables/useContactForm'

  const { form, success, error, sendMessage } = useContactForm()
</script>
