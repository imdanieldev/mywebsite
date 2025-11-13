<template>
    <nav class="fixed w-full left-0 top-0 z-10 h-16 bg-dark/80 backdrop-blur-md border-b border-accent-blue/10">
        <div class="max-w-container mx-auto px-4 h-full flex justify-between items-center">
            <a href="#home" @click="handleLinkClick" class="text-2xl font-bold text-accent-cyan z-11">
                Danial Nasr
            </a>
            <div class="hidden md:flex space-x-6">
                <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" :class="[
                    'relative py-2 transition-colors hover:text-accent-blue',
                    { 'text-accent-blue': activeSection === link.id },
                    { 'text-secondary': activeSection != link.id }
                ]" @click="handleLinkClick">
                    {{ link.label }}
                    <span :class="[
                        'absolute left-0 bottom-0 h-0.5 bg-accent-blue transition-all duration-300',
                        activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                    ]"></span>
                </a>
            </div>
            <button class="md:hidden p-2 z-11" @click="isMenuOpen = !isMenuOpen" :class="{ 'active': isMenuOpen }">
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
                'md:hidden overflow-hidden outline-0 absolute top-16 left-0 w-full bg-dark border-t border-accent-blue/10 transition-all duration-400',
                isMenuOpen ? 'max-h-[500px] py-4' : 'max-h-0'
            ]">
                <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" :class="[
                    'block px-6 py-3 text-secondary transition-colors border-l-4',
                    activeSection === link.id
                        ? 'text-accent-blue bg-accent-blue/10 border-accent-blue'
                        : 'border-transparent hover:text-accent-blue'
                ]" @click="handleMobileNavClick">
                    {{ link.label }}
                </a>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)
const activeSection = ref('home')

const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
]

const handleLinkClick = (e: Event) => {
    e.preventDefault()
    const target = e.currentTarget as HTMLAnchorElement
    const targetId = target.getAttribute('href')?.substring(1)

    if (targetId) {
        const element = document.getElementById(targetId)
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

const handleMobileNavClick = (e: Event) => {
    handleLinkClick(e)
    if (window.innerWidth < 768) {
        isMenuOpen.value = false
    }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
    const sections = document.querySelectorAll('header, section')

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id
                }
            })
        },
        {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        }
    )

    sections.forEach((section) => observer?.observe(section))
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>