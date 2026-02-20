<template>
    <section id="testimonials" class="py-20 scroll-mt-20 text-center">
        <h2 data-aos="fade-up"
            class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
            Testimonials
        </h2>

        <p data-aos="fade-up" data-aos-delay="100" class="text-secondary max-w-2xl mx-auto mb-10">
            Real feedback from founders and teams I have worked with on product design, development quality, and
            delivery speed.
        </p>

        <div data-aos="fade-up" data-aos-delay="160" class="relative max-w-4xl mx-auto" @mouseenter="pauseAutoplay"
            @mouseleave="startAutoplay" @focusin="pauseAutoplay" @focusout="startAutoplay">
            <div class="overflow-hidden rounded-2xl pt-2 -mt-2">
                <div class="flex transition-transform duration-(--motion-slow) ease-(--motion-ease)"
                    :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
                    <article v-for="testimonial in testimonials" :key="testimonial.name"
                        class="group relative isolate w-full shrink-0 overflow-hidden bg-bg-card p-7 rounded-2xl border border-accent-blue/15 transition-all duration-(--motion-base) ease-(--motion-ease) hover:-translate-y-1 hover:border-accent-cyan/60 hover:shadow-[0_18px_36px_rgba(6,182,212,0.18)] text-left">
                        <div
                            class="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-(--motion-base) ease-(--motion-ease) group-hover:opacity-100 bg-linear-to-br from-accent-blue/10 via-transparent to-accent-cyan/10">
                        </div>

                        <div>
                            <div class="flex items-center justify-between mb-5">
                                <div
                                    class="w-11 h-11 rounded-xl border border-accent-blue/20 bg-dark/50 text-accent-cyan font-bold flex items-center justify-center">
                                    {{ getInitials(testimonial.name) }}
                                </div>
                                <div class="flex items-center gap-1" aria-label="5 out of 5 rating">
                                    <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg"
                                        :class="i <= testimonial.rate ? 'w-4 h-4 text-amber-400' : 'w-4 h-4 text-secondary'"
                                        viewBox="0 0 24 24" role="img" aria-hidden="false">
                                        <path :fill="i <= testimonial.rate ? 'currentColor' : 'none'"
                                            :stroke="i <= testimonial.rate ? 'none' : 'currentColor'" stroke-width="1"
                                            d="m12 17.27l-5.18 3.05l1.39-5.89L3.64 10.5l6.03-.52L12 4.5l2.33 5.48l6.03.52l-4.57 3.93l1.39 5.89z" />
                                    </svg>
                                </div>
                            </div>

                            <span class="text-accent-cyan text-4xl leading-none block mb-2">“</span>
                            <p class="italic text-primary leading-relaxed grow mb-6">
                                {{ testimonial.quote }}
                            </p>
                        </div>

                        <footer class="border-t border-accent-blue/10 pt-4">
                            <h4 class="font-semibold text-accent-blue mb-1">
                                {{ testimonial.name }}
                            </h4>
                            <span class="text-sm text-secondary block mb-2">
                                {{ testimonial.position }}
                            </span>
                            <span
                                class="inline-flex text-xs px-2.5 py-1 rounded-full border border-accent-blue/20 text-secondary bg-dark/40">
                                Verified Client
                            </span>
                        </footer>
                    </article>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-center gap-3">
                <button
                    class="h-10 w-10 rounded-full border flex justify-center items-center border-accent-blue/25 text-primary transition-all duration-(--motion-fast) ease-(--motion-ease) hover:border-accent-cyan hover:text-accent-cyan hover:-translate-y-0.5"
                    @click="prev" aria-label="Previous testimonial">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                        viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined -->
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M10 12h10M5.414 13.603l.967.76c1.565 1.234 2.348 1.851 2.984 1.57c.635-.281.635-1.245.635-3.172V11.24c0-1.927 0-2.89-.635-3.172c-.636-.281-1.419.336-2.984 1.57l-.967.76C4.471 11.14 4 11.511 4 12s.471.86 1.414 1.603" />
                    </svg>
                </button>
                <div class="flex items-center gap-2">
                    <button v-for="(testimonial, index) in testimonials" :key="`${testimonial.name}-dot`"
                        :aria-label="`Go to testimonial ${index + 1}`" :aria-current="activeIndex === index"
                        @click="goTo(index)" :class="[
                            'h-2.5 rounded-full transition-all duration-(--motion-base) ease-(--motion-ease)',
                            activeIndex === index ? 'w-8 bg-accent-cyan' : 'w-2.5 bg-secondary/40 hover:bg-secondary/65'
                        ]">
                    </button>
                </div>
                <button
                    class="h-10 w-10 rounded-full border flex justify-center items-center border-accent-blue/25 text-primary transition-all duration-(--motion-fast) ease-(--motion-ease) hover:border-accent-cyan hover:text-accent-cyan hover:-translate-y-0.5"
                    @click="next" aria-label="Next testimonial">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                        viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined -->
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M14 12H4m14.586 1.603l-.967.76c-1.565 1.234-2.348 1.851-2.984 1.57C14 15.652 14 14.688 14 12.76v-1.52c0-1.927 0-2.89.635-3.172c.636-.281 1.419.336 2.984 1.57l.967.76C19.529 11.14 20 11.511 20 12s-.471.86-1.414 1.603" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const AUTOPLAY_DELAY = 5000
const activeIndex = ref(0)
let autoplay: ReturnType<typeof setInterval> | null = null

const getInitials = (name: string) => {
    const chunks = name.split(' ').filter(Boolean)
    return chunks.slice(0, 2).map((chunk) => chunk[0]).join('').toUpperCase()
}

const testimonials = [
    {
        quote: "Danial makes your brand look completely professional by creating websites with high speed, lots of animations, and a beautiful appearance.",
        name: "Rahman Jamshidi",
        position: "Founder, Arvand Academy.",
        rate: 4
    },
    {
        quote: "Danial is very precise in designing the appearance, using the best fonts and colors that match your brand.",
        name: "Mohammad Reza Shakerin",
        position: "Founder, Niyayesh Print.",
        rate: 5
    },
    {
        quote: "Not only is Danial a professional at his job, but his extensive experience has made websites at their best in terms of security.",
        name: "Ariyan Ebrahimi",
        position: "Developer",
        rate: 4
    }
]

const next = () => {
    activeIndex.value = (activeIndex.value + 1) % testimonials.length
}

const prev = () => {
    activeIndex.value = (activeIndex.value - 1 + testimonials.length) % testimonials.length
}

const goTo = (index: number) => {
    activeIndex.value = index
}

const pauseAutoplay = () => {
    if (!autoplay) {
        return
    }
    clearInterval(autoplay)
    autoplay = null
}

const startAutoplay = () => {
    pauseAutoplay()
    autoplay = setInterval(next, AUTOPLAY_DELAY)
}

onMounted(() => {
    startAutoplay()
})

onUnmounted(() => {
    pauseAutoplay()
})
</script>
