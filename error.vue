<template>
  <div class="flex flex-col justify-center p-4 max-w-md mx-auto h-screen">
    <h1 class="text-center py-2">ERROR {{ error.statusCode }}</h1>
    <NuxtLink to="/" class="bg-blue-500 text-white text-center py-2 rounded">
      <button>Go back home</button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue'

  interface ErrorProp {
    statusCode?: number
  }

  defineProps({
    error: {
      type: Object as PropType<ErrorProp>,
      required: true,
    },
  })
</script>
