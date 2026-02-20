<template>
    <section id="services" class="py-20 scroll-mt-20 text-center">
        <h2 data-aos="fade-up"
            class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
            What I Do
        </h2>

        <p data-aos="fade-up" data-aos-delay="100" class="text-lg text-secondary max-w-2xl mx-auto mb-12">
            Practical services focused on shipping products that look sharp, load fast, and convert.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
            <div v-for="(service, index) in services" :key="service.id" :data-aos="'fade-up'"
                :data-aos-delay="(index + 1) * 100"
                class="group relative isolate overflow-hidden bg-bg-card p-8 rounded-2xl border border-accent-blue/10 transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]">
                <div class="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    :class="service.color === 'blue' ? 'bg-linear-to-br from-accent-blue/10 via-transparent to-transparent' : 'bg-linear-to-br from-accent-cyan/10 via-transparent to-transparent'">
                </div>

                <div class="flex items-start justify-between gap-4 mb-6">
                    <div :class="[
                    'w-14 h-14 rounded-lg flex items-center justify-center transition-colors',
                    service.color === 'blue'
                        ? 'bg-accent-blue/10 group-hover:bg-accent-blue/20'
                        : 'bg-accent-cyan/10 group-hover:bg-accent-cyan/20'
                ]">
                        <div v-html="service.icon"
                            :class="service.color === 'blue' ? 'text-accent-blue' : 'text-accent-cyan'"></div>
                    </div>
                    <span class="text-xs font-semibold tracking-wide text-secondary bg-dark/60 border border-white/5 rounded-full px-3 py-1">
                        0{{ index + 1 }}
                    </span>
                </div>

                <h3 :class="[
                    'text-2xl font-semibold text-primary mb-3 transition-colors leading-tight',
                    service.color === 'blue'
                        ? 'group-hover:text-accent-blue'
                        : 'group-hover:text-accent-cyan'
                ]">
                    {{ service.title }}
                </h3>

                <p class="text-secondary mb-5">
                    {{ service.description }}
                </p>

                <ul class="space-y-2 text-sm text-secondary border-t border-accent-blue/10 pt-5">
                    <li v-for="feature in service.features" :key="feature" class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 text-accent-cyan shrink-0"
                            viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" d="M5 14.5s1.5 0 3.5 3.5c0 0 5.559-9.167 10.5-11" />
                        </svg>
                        {{ feature }}
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const services = [
    {
        id: 'webdev',
        title: 'Web Development',
        description: 'End-to-end development for business websites and web apps with clean architecture and reliable delivery.',
        color: 'blue',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m17 8l1.84 1.85c.773.778 1.16 1.167 1.16 1.65s-.387.872-1.16 1.65L17 15M7 8L5.16 9.85C4.387 10.628 4 11.017 4 11.5s.387.872 1.16 1.65L7 15m7.5-11l-5 16"/></svg>`,
        features: [
            'Landing Pages & Web Apps',
            'Responsive Design',
            'Performance Optimization',
            'Security & Maintenance'
        ]
    },
    {
        id: 'consulting',
        title: 'Product Consulting',
        description: 'Clear technical direction for your product roadmap, stack decisions, and launch priorities.',
        color: 'cyan',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M13 3a8 8 0 0 1 8 8m-7.5-4.5a4 4 0 0 1 4 4"/><path d="m9.158 5.712l-.402-.906c-.264-.592-.395-.888-.592-1.115a2 2 0 0 0-.928-.603C6.949 3 6.624 3 5.976 3c-.948 0-1.422 0-1.82.182a2.12 2.12 0 0 0-1.061 1.169c-.143.413-.102.838-.02 1.689q1.31 13.575 14.885 14.885c.85.082 1.276.123 1.69-.02a2.12 2.12 0 0 0 1.168-1.06c.182-.399.182-.873.182-1.821c0-.649 0-.973-.088-1.26a2 2 0 0 0-.603-.928c-.227-.197-.523-.328-1.115-.592l-.906-.402c-.642-.285-.962-.428-1.288-.459a2 2 0 0 0-.919.128c-.305.119-.575.343-1.114.793c-.537.447-.805.67-1.133.79a2.16 2.16 0 0 1-.982.101c-.345-.05-.61-.192-1.139-.475c-1.646-.88-2.553-1.787-3.433-3.433c-.283-.53-.424-.794-.475-1.14a2.16 2.16 0 0 1 .1-.98c.12-.329.344-.597.791-1.134c.45-.54.674-.809.793-1.114c.114-.292.158-.607.128-.919c-.031-.325-.174-.646-.459-1.288Z"/></g></svg>`,
        features: [
            'MVP Strategy',
            'Architecture Decisions',
            'Launch Planning'
        ]
    },
    {
        id: 'uiux-design',
        title: 'UI/UX Design',
        description: 'Interfaces designed for clarity and action, with a strong focus on interaction quality and visual consistency.',
        color: 'blue',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M17.58 9.71a6 6 0 0 0-7.16 3.58m7.16-3.58A6 6 0 1 1 12 19.972M17.58 9.71a6 6 0 1 0-11.16 0m4 3.58A6 6 0 0 0 10 15.5c0 1.777.773 3.374 2 4.472m-1.58-6.682a6.01 6.01 0 0 1-4-3.58m0 0A6 6 0 1 0 12 19.972"/></svg>`,
        features: [
            'Interface Design System',
            'Wireframe to Prototype',
            'UX Improvements'
        ]
    },
]
</script>
