<template>
  <div class="w-fit">
    <h1 ref="title" class="text-3xl font-bold mb-4">🥟ПЕЛЬМЕНИ🥟</h1>
    <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="animate">
      Animate!
    </button>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useGsap } from '#gsap'

  const title = ref(null)

  const animate = () => {
    useGsap.set(title.value, { clearProps: 'all' })

    useGsap.to(title.value, {
      x: 0,
      rotation: 360,
      duration: 1,
      ease: 'power1.inOut',
    })
  }

  onMounted(() => {
    useGsap.from(title.value, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power2.out',
    })
  })
</script>
