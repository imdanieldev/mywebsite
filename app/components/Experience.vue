<template>
    <section id="experience" class="py-20 scroll-mt-20 text-center">
        <h2 data-aos="fade-up"
            class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
            Work Experience
        </h2>

        <div class="relative max-w-6xl mx-auto text-left">
            <div class="absolute left-2 top-0 bottom-0 w-px bg-linear-to-b from-accent-blue/40 via-accent-cyan/40 to-transparent md:left-1/2 md:-translate-x-1/2">
            </div>

            <article v-for="(exp, index) in experiences" :key="index" :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
                :data-aos-delay="index * 150"
                class="relative mb-8 pl-10 md:w-1/2"
                :class="index % 2 === 0 ? 'md:pr-12 md:mr-auto' : 'md:pl-12 md:ml-auto'">
                <span class="absolute top-6 left-2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-blue border-4 border-dark z-20 transition-all duration-300 hover:scale-110 hover:bg-accent-cyan"
                    :class="index % 2 === 0 ? 'md:left-auto md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'"></span>

                <div class="group bg-bg-card/90 border border-accent-blue/15 rounded-2xl p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/60 hover:shadow-[0_16px_34px_rgba(6,182,212,0.16)]">
                    <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <h3 class="text-xl font-semibold text-primary">
                            {{ exp.title }}
                        </h3>
                        <span class="text-xs font-semibold tracking-wide text-secondary bg-dark/70 border border-white/5 rounded-full px-3 py-1">
                            {{ exp.period }}
                        </span>
                    </div>

                    <h4 class="text-base text-accent-cyan mb-3 font-medium">
                        {{ exp.company }}
                    </h4>

                    <p class="text-secondary text-sm leading-relaxed mb-4">
                        {{ exp.description }}
                    </p>

                    <ul class="space-y-2 text-sm text-secondary border-t border-accent-blue/10 pt-4">
                        <li v-for="point in exp.highlights" :key="point" class="flex items-start gap-2">
                            <span class="mt-1.5 block w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
                            <span>{{ point }}</span>
                        </li>
                    </ul>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup lang="ts">
const experiences = [
    {
        title: 'Senior Full-Stack Developer',
        company: 'Niyayesh Print.',
        period: 'March 2025 - Feb 2026',
        description: 'Leading the architecture and development of a production-grade online print store built for growth.',
        highlights: [
            'Built Nuxt + Strapi storefront and content workflow',
            'Managed cross-functional design and implementation flow',
            'Improved page speed and checkout reliability'
        ]
    },
    {
        title: 'Senior Front-End Developer',
        company: 'Arvand Academy.',
        period: 'July 2025 - Present',
        description: 'Delivered the corporate web experience with a strong focus on performance, clarity, and maintainable front-end structure.',
        highlights: [
            'Developed reusable Nuxt/Tailwind component system',
            'Refined interaction quality and visual hierarchy',
            'Implemented SEO and technical optimization'
        ]
    },
    {
        title: 'Junior Web Developer',
        company: 'YarNovin.',
        period: '2020 - April 2025',
        description: 'Started as a front-end assistant and forum manager, building a strong foundation in product delivery and team collaboration.',
        highlights: [
            'Supported UI implementation across multiple pages',
            'Handled content/forum operational workflows',
            'Contributed to bug fixes and release QA'
        ]
    }
]
</script>
