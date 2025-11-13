<script setup lang="ts">
const { data } = await useAsyncData('projects', () =>
  queryCollection('projects').all()
)
</script>

<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>