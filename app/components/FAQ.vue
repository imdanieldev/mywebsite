<template>
    <section id="faq" class="py-20 scroll-mt-20 text-center">
        <h2 data-aos="fade-up"
            class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
                Frequently Asked Questions
        </h2>
        <p data-aos="fade-up" data-aos-delay="100" class="text-secondary max-w-2xl mx-auto mb-12">
            Quick answers to the most common project and collaboration questions.
        </p>

        <div class="max-w-3xl mx-auto space-y-3">
            <article v-for="(item, index) in faqItems" :key="item.question" data-aos="fade-up" :data-aos-delay="80 * (index + 1)"
                class="rounded-2xl border border-accent-blue/15 bg-bg-card/70 overflow-hidden">
                <button
                    class="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-accent-blue/5 transition-colors duration-(--motion-fast) ease-(--motion-ease)"
                    :aria-expanded="openIndex === index" @click="toggle(index)">
                    <span class="text-primary font-medium">{{ item.question }}</span>
                    <span class="text-accent-cyan text-xl leading-none transition-transform duration-(--motion-base) ease-(--motion-ease)"
                        :class="openIndex === index ? 'rotate-45' : 'rotate-0'">
                        +
                    </span>
                </button>

                <div class="grid transition-all duration-(--motion-base) ease-(--motion-ease)"
                    :class="openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
                    <div class="overflow-hidden">
                        <p class="px-5 pb-5 text-secondary leading-relaxed">
                            {{ item.answer }}
                        </p>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(0)

const faqItems = [
    {
        question: 'How fast can we start a new project?',
        answer: 'After a short discovery call and scope confirmation, most projects can start within 2 to 5 business days.'
    },
    {
        question: 'Do you handle both design and development?',
        answer: 'Yes. I can handle UI/UX design, frontend development, and backend integration based on your project needs.'
    },
    {
        question: 'Can you improve an existing website instead of building from scratch?',
        answer: 'Absolutely. I often optimize existing websites for speed, UX, SEO, and conversion without requiring a full rebuild.'
    },
    {
        question: 'What tech stack do you usually work with?',
        answer: 'My common stack includes Nuxt, Vue, Tailwind CSS, and headless CMS solutions like Strapi, depending on requirements.'
    },
    {
        question: 'Do you provide support after delivery?',
        answer: 'Yes. I offer post-launch support for bug fixes, minor improvements, and ongoing maintenance when needed.'
    }
]

const toggle = (index: number) => {
    openIndex.value = openIndex.value === index ? null : index
}
</script>
