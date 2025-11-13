<template>
    <nav class="fixed w-full left-0 top-0 z-10 h-16 bg-dark/80 backdrop-blur-md border-b border-accent-blue/10">
        <div class="max-w-container mx-auto px-4 h-full flex justify-between items-center">
            <NuxtLink to="/"
                class="text-2xl font-bold text-accent-cyan z-11 transition-colors hover:text-accent-blue">
                Danial Nasr
            </NuxtLink>

            <div class="hidden md:flex space-x-6">
                <NuxtLink v-for="link in navLinks" :key="link.id" :to="link.path" :class="[
                    'relative py-2 text-text-secondary transition-colors hover:text-accent-blue',
                    { 'text-accent-blue': isActive(link.path) }
                ]">
                    {{ link.label }}
                    <span :class="[
                        'absolute left-0 bottom-0 h-0.5 bg-accent-blue transition-all duration-300',
                        isActive(link.path) ? 'w-full' : 'w-0 hover:w-full'
                    ]"></span>
                </NuxtLink>
            </div>
            <button class="md:hidden p-2 z-11" @click="isMenuOpen = !isMenuOpen"
                :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'" :aria-expanded="isMenuOpen">
                <div class="w-6 h-6 flex flex-col justify-center items-end space-y-1">
                    <span :class="[
                        'block w-6 h-0.5 bg-primary transition-all duration-300',
                        isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    ]"></span>
                    <span :class="[
                        'block w-6 h-0.5 bg-primary transition-all duration-300',
                        isMenuOpen ? 'opacity-0' : ''
                    ]"></span>
                    <span :class="[
                        'block w-6 h-0.5 bg-primary transition-all duration-300',
                        isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    ]"></span>
                </div>
            </button>
            <div :class="[
                'md:hidden absolute top-16 left-0 w-full bg-dark border-t border-accent-blue/10 transition-all duration-400 overflow-hidden',
                isMenuOpen ? 'max-h-[500px] py-4' : 'max-h-0'
            ]">
                <NuxtLink v-for="link in navLinks" :key="link.id" :to="link.path" :class="[
                    'block px-6 py-3 text-text-secondary transition-colors border-l-4',
                    isActive(link.path)
                        ? 'text-accent-blue bg-accent-blue/10 border-accent-blue'
                        : 'border-transparent hover:text-accent-blue hover:border-accent-blue/50'
                ]" @click="handleMobileNavClick">
                    {{ link.label }}
                </NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)

const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'projects', label: 'Projects', path: '/projects' },
    { id: 'blog', label: 'Blog', path: '/blog' }
]
const isActive = (path: string) => {
    if (path === '/') {
        return route.path === '/'
    }
    return route.path.startsWith(path)
}
const handleMobileNavClick = () => {
    if (window.innerWidth < 768) {
        isMenuOpen.value = false
    }
}
const handleClickOutside = (e: MouseEvent) => {
    const nav = document.querySelector('nav')
    if (nav && !nav.contains(e.target as Node)) {
        isMenuOpen.value = false
    }
}
watch(() => route.path, () => {
    isMenuOpen.value = false
})
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.md\:flex a::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.md\:flex a:hover::before {
    opacity: 1;
}

</style>