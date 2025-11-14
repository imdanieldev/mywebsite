<template>
    <section id="services" class="py-20 scroll-mt-20 text-center">
        <h2 data-aos="fade-up"
            class="text-4xl md:text-5xl font-bold text-primary mb-4 inline-block border-b-2 border-accent-blue/20 pb-2">
            What I Do
        </h2>

        <p data-aos="fade-up" data-aos-delay="100" class="text-lg text-secondary max-w-2xl mx-auto mb-12">
            I offer comprehensive web development services to bring your ideas to life
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            <div v-for="(service, index) in services" :key="service.id" :data-aos="'fade-up'"
                :data-aos-delay="(index + 1) * 100"
                class="group relative bg-bg-card p-8 rounded-xl border border-accent-blue/10 hover:border-accent-blue hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]">
                <div :class="[
                    'w-16 h-16 mb-6 rounded-lg flex items-center justify-center transition-colors',
                    service.color === 'blue'
                        ? 'bg-accent-blue/10 group-hover:bg-accent-blue/20'
                        : 'bg-accent-cyan/10 group-hover:bg-accent-cyan/20'
                ]">
                    <div v-html="service.icon"
                        :class="service.color === 'blue' ? 'text-accent-blue' : 'text-accent-cyan'"></div>
                </div>

                <h3 :class="[
                    'text-2xl font-semibold text-primary mb-3 transition-colors',
                    service.color === 'blue'
                        ? 'group-hover:text-accent-blue'
                        : 'group-hover:text-accent-cyan'
                ]">
                    {{ service.title }}
                </h3>

                <p class="text-secondary mb-4">
                    {{ service.description }}
                </p>
                <ul class="space-y-2 text-sm text-secondary">
                    <li v-for="feature in service.features" :key="feature" class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2 text-accent-cyan shrink-0"
                            viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5" d="M5 14.5s1.5 0 3.5 3.5c0 0 5.559-9.167 10.5-11" />
                        </svg>
                        {{ feature }}
                    </li>
                </ul>
                <div :class="[
                    'absolute top-4 right-4 w-20 h-20 rounded-full -z-10 group-hover:scale-150 transition-transform duration-500',
                    service.color === 'blue' ? 'bg-accent-blue/5' : 'bg-accent-cyan/5'
                ]"></div>
            </div>

        </div>
    </section>
</template>

<script setup lang="ts">
const services = [
    {
        id: 'webdev',
        title: 'Web Development',
        description: 'Building a complete site with the latest technologies along with full site support.',
        color: 'blue',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m17 8l1.84 1.85c.773.778 1.16 1.167 1.16 1.65s-.387.872-1.16 1.65L17 15M7 8L5.16 9.85C4.387 10.628 4 11.017 4 11.5s.387.872 1.16 1.65L7 15m7.5-11l-5 16"/></svg>`,
        features: [
            'Application',
            'Responsive Design',
            'Performance Optimization',
            'Full Security'
        ]
    },
    {
        id: 'consulting',
        title: 'Consulting',
        description: 'Advice on your business. Financial advice and how to move your business forward. Advice on whether or not to take your business online.',
        color: 'cyan',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M13 3a8 8 0 0 1 8 8m-7.5-4.5a4 4 0 0 1 4 4"/><path d="m9.158 5.712l-.402-.906c-.264-.592-.395-.888-.592-1.115a2 2 0 0 0-.928-.603C6.949 3 6.624 3 5.976 3c-.948 0-1.422 0-1.82.182a2.12 2.12 0 0 0-1.061 1.169c-.143.413-.102.838-.02 1.689q1.31 13.575 14.885 14.885c.85.082 1.276.123 1.69-.02a2.12 2.12 0 0 0 1.168-1.06c.182-.399.182-.873.182-1.821c0-.649 0-.973-.088-1.26a2 2 0 0 0-.603-.928c-.227-.197-.523-.328-1.115-.592l-.906-.402c-.642-.285-.962-.428-1.288-.459a2 2 0 0 0-.919.128c-.305.119-.575.343-1.114.793c-.537.447-.805.67-1.133.79a2.16 2.16 0 0 1-.982.101c-.345-.05-.61-.192-1.139-.475c-1.646-.88-2.553-1.787-3.433-3.433c-.283-.53-.424-.794-.475-1.14a2.16 2.16 0 0 1 .1-.98c.12-.329.344-.597.791-1.134c.45-.54.674-.809.793-1.114c.114-.292.158-.607.128-.919c-.031-.325-.174-.646-.459-1.288Z"/></g></svg>`,
        features: [
            'Financial advice',
            'Marketing Consulting',
            'Branding Consulting'
        ]
    },
    {
        id: 'uiux-design',
        title: 'Ui/Ux Design',
        description: 'Creating intuitive and engaging user interfaces that deliver exceptional user experiences. Complete attention to font, color, and dimension selection.',
        color: 'blue',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined --><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M17.58 9.71a6 6 0 0 0-7.16 3.58m7.16-3.58A6 6 0 1 1 12 19.972M17.58 9.71a6 6 0 1 0-11.16 0m4 3.58A6 6 0 0 0 10 15.5c0 1.777.773 3.374 2 4.472m-1.58-6.682a6.01 6.01 0 0 1-4-3.58m0 0A6 6 0 1 0 12 19.972"/></svg>`,
        features: [
            'User Interface Design',
            'Prototyping & Wireframing',
            'User Research'
        ]
    },
]
</script>