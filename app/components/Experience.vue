<template>
    <section id="experience" class="py-20 scroll-mt-20 text-center">
        <h2 data-aos="fade-up"
            class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
            Work Experience
        </h2>

        <div ref="timelineContainer" :class="[
            'relative max-w-4xl mx-auto pl-4 text-left',
            'after:content-[\' \'] after:absolute after:w-0.5 after:bg-accent-blue/30 after:top-0 after:left-1.5 after:transition-all after:duration-1000 after:ease-out', isTimelineActive ? 'after:h-full' : 'after:h-0'
        ]">
            <div v-for="(exp, index) in experiences" :key="index"
                data-aos="fade-left" :data-aos-delay="index * 150" :class="[
                    'relative py-2.5 px-0 pb-5 pl-8',
                    'before:content-[\' \'] before:absolute before:w-4 before:h-4 before:left-0 before:top-4 before:bg-accent-blue before:border-4 before:border-dark before:rounded-full before:z-10 before:transition-all before:duration-300', 'hover:before:bg-accent-cyan hover:before:shadow-[0_0_5px_rgba(6,182,212,1)]']">
                <div class="md:before:-left-4">
                    <h3 class="text-xl font-semibold text-primary mb-1">
                        {{ exp.title }}
                    </h3>
                    <h4 class="text-base text-accent-cyan mb-2 font-medium">
                        {{ exp.company }}
                    </h4>
                    <span class="block text-sm text-secondary mb-3">
                        {{ exp.period }}
                    </span>
                    <p class="text-secondary text-sm leading-relaxed">
                        {{ exp.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const timelineContainer = ref<HTMLElement | null>(null)
const isTimelineActive = ref(false)

const experiences = [
    {
        title: 'Senior Full-Stack Developer',
        company: 'Niyayesh Print.',
        period: 'March 2025 - Present',
        description: 'Building a web store application with professional development and high-precision design. Full management of the graphics team. Built with Nuxt js, Gsap, TailwindCss, and Strapi.'
    },
    {
        title: 'Senior Front-End Developer',
        company: 'Arvand Academy.',
        period: 'July 2025 - Present',
        description: 'Arvand corporate design website. And fully optimized and professional development with Nuxt js, TailwindCss and Gsap.'
    },
    {
        title: 'Junior Web Developer',
        company: 'YarNovin.',
        period: '2020 - April 2025',
        description: 'Front-end developer assistant and forum manager.'
    }
]

let observer: IntersectionObserver | null = null

onMounted(() => {
    const section = document.getElementById('experience')

    if (section) {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isTimelineActive.value = true
                    }
                })
            },
            {
                threshold: 0.2
            }
        )

        observer.observe(section)
    }
})

onUnmounted(() => {
    observer?.disconnect()
})
</script>