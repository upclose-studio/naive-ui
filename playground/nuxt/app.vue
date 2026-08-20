<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { computed, ref } from 'vue'

const isDark = ref(false)
const theme = computed(() => (isDark.value ? darkTheme : null))

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Age', key: 'age' }
]
const data = [
  { name: 'Alice', age: 24 },
  { name: 'Bob', age: 31 }
]
</script>

<template>
  <n-config-provider :theme="theme">
    <n-space vertical>
      <n-button type="primary" @click="isDark = !isDark">
        {{ isDark ? 'Dark' : 'Light' }}
      </n-button>
      <n-date-picker />
      <n-data-table :columns="columns" :data="data" />
    </n-space>
  </n-config-provider>
</template>
