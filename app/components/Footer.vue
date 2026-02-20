<template>
    <footer class="py-8 border-t border-accent-blue/10 text-secondary text-sm">
        <div class="max-w-container mx-auto px-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div class="text-center sm:text-left">
                &copy; {{ currentYear }} Danial Nasr. All rights reserved.
            </div>
            <button type="button" @click="toggleTheme" :aria-pressed="isDark"
                class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent-blue/20 bg-bg-card px-3 py-1.5 text-xs font-semibold tracking-wide text-secondary transition-all hover:-translate-y-0.5 hover:border-accent-cyan/60 hover:text-primary">
                <span class="inline-flex h-5 w-9 items-center rounded-full border border-accent-blue/20 bg-dark/60 px-0.5 transition-colors"
                    :class="isDark ? 'justify-end' : 'justify-start'">
                    <span class="h-3.5 w-3.5 rounded-full bg-accent-cyan transition-all"></span>
                </span>
                <span>{{ isDark ? 'Dark' : 'Light' }}</span>
            </button>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const currentYear = new Date().getFullYear()
const isDark = ref(false)
const storageKey = 'theme-preference'
let media: MediaQueryList | null = null
let mediaListener: ((event: MediaQueryListEvent) => void) | null = null

const getSystemTheme = () => (media?.matches ? 'dark' : 'light')

const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement
    if (theme === 'system') {
        root.removeAttribute('data-theme')
        root.style.colorScheme = ''
        isDark.value = getSystemTheme() === 'dark'
        return
    }
    root.setAttribute('data-theme', theme)
    root.style.colorScheme = theme
    isDark.value = theme === 'dark'
}

const toggleTheme = () => {
    const next = isDark.value ? 'light' : 'dark'
    localStorage.setItem(storageKey, next)
    applyTheme(next)
    flashThemeTransition()
}

// Add a short overlay class to smooth the whole-page transition
const flashThemeTransition = () => {
    const root = document.documentElement
    try {
        const raw = getComputedStyle(root).getPropertyValue('--motion-base').trim() || '320ms'
        let ms = 320
        if (raw.endsWith('ms')) ms = parseFloat(raw)
        else if (raw.endsWith('s')) ms = parseFloat(raw) * 1000
        root.classList.add('theme-switching')
        window.setTimeout(() => root.classList.remove('theme-switching'), Math.max(180, ms))
    } catch (e) {
        root.classList.add('theme-switching')
        window.setTimeout(() => root.classList.remove('theme-switching'), 320)
    }
}

onMounted(() => {
    media = window.matchMedia('(prefers-color-scheme: dark)')
    const saved = localStorage.getItem(storageKey) as 'light' | 'dark' | null
    applyTheme(saved ?? 'system')

    if (!saved) {
        mediaListener = () => applyTheme('system')
        media.addEventListener('change', mediaListener)
    }
})

onUnmounted(() => {
    if (media && mediaListener) {
        media.removeEventListener('change', mediaListener)
    }
})
</script>
