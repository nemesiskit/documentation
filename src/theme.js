import { ref } from 'vue'

const STORAGE_KEY = 'nk-theme'

export const isDark = ref(localStorage.getItem(STORAGE_KEY) === 'dark')

export function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
}

export function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  applyTheme()
}
