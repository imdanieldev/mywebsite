<template>
    <nav :class="[
        'fixed w-full left-0 top-0 z-10 h-16 border-b backdrop-blur-md transition-all duration-(--motion-base) ease-(--motion-ease)',
        isScrolled
            ? 'bg-dark/60 border-accent-blue/25 shadow-[0_8px_30px_rgba(2,6,23,0.32)]'
            : 'bg-dark/80 border-accent-blue/10'
    ]">
        <div :class="[
            'max-w-container mx-auto px-4 h-full flex justify-between items-center transition-all duration-(--motion-base) ease-(--motion-ease)',
            isScrolled ? 'scale-[0.985]' : 'scale-100'
        ]">
            <a href="#home" @click="handleLinkClick" :class="[
                'font-bold text-accent-cyan z-11 transition-all duration-(--motion-base) ease-(--motion-ease)',
                isScrolled ? 'text-[1.35rem]' : 'text-2xl'
            ]">
                Danial Nasr
            </a>
            <div class="hidden md:flex space-x-6">
                <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" :class="[
                    'relative py-2 transition-colors duration-(--motion-fast) ease-(--motion-ease) hover:text-accent-blue',
                    { 'text-accent-blue': activeSection === link.id },
                    { 'text-secondary': activeSection != link.id }
                ]" @click="handleLinkClick">
                    {{ link.label }}
                    <span :class="[
                        'absolute left-0 bottom-0 h-0.5 bg-accent-blue transition-all duration-(--motion-base) ease-(--motion-ease)',
                        activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                    ]"></span>
                </a>
            </div>
            <button class="md:hidden p-2 z-11" @click="isMenuOpen = !isMenuOpen" :class="{ 'active': isMenuOpen }">
                <div class="w-6 h-6 flex flex-col justify-center items-end space-y-1">
                    <span :class="[
                        'block w-6 h-0.5 bg-primary transition-all duration-(--motion-base) ease-(--motion-ease)',
                        isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    ]"></span>
                    <span :class="[
                        'block w-6 h-0.5 bg-primary transition-all duration-(--motion-base) ease-(--motion-ease)',
                        isMenuOpen ? 'opacity-0' : ''
                    ]"></span>
                    <span :class="[
                        'block w-6 h-0.5 bg-primary transition-all duration-(--motion-base) ease-(--motion-ease)',
                        isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    ]"></span>
                </div>
            </button>
            <div :class="[
                'md:hidden overflow-hidden outline-0 absolute top-16 left-0 w-full bg-dark/95 border-t border-accent-blue/10 transition-all duration-(--motion-slow) ease-(--motion-ease)',
                isMenuOpen ? 'max-h-[500px] py-4' : 'max-h-0'
            ]">
                <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" :class="[
                    'block px-6 py-3 text-secondary transition-colors duration-(--motion-fast) ease-(--motion-ease) border-l-4',
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
const isScrolled = ref(false)

const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
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
const handleScroll = () => {
    isScrolled.value = window.scrollY > 12
}

onMounted(() => {
    const sections = document.querySelectorAll('header, section')
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

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
    window.removeEventListener('scroll', handleScroll)
})
</script>
