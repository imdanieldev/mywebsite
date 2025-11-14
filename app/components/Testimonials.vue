<template>
    <section id="testimonials" class="py-20 scroll-mt-20 text-center">
        <h2 data-aos="fade-up"
            class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
            Testimonials
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div v-for="(testimonial, index) in testimonials" :key="index" :data-aos="'flip-up'"
                :data-aos-delay="(index + 1) * 100"
                class="bg-bg-card p-8 rounded-xl border border-accent-cyan/20 shadow-lg flex flex-col justify-between h-full hover:shadow-[0_15px_30px_rgba(6,182,212,0.4)] hover:border-accent-blue">
                <div>
                    <span class="text-accent-cyan text-4xl block mb-2">“</span>
                    <p class="italic text-primary grow mb-6">
                        {{ testimonial.quote }}
                    </p>
                </div>
                <div class="border-t border-secondary/10 pt-4 text-center">
                    <h4 class="font-semibold text-accent-blue mb-1">
                        {{ testimonial.name }}
                    </h4>
                    <span class="text-sm text-secondary">
                        {{ testimonial.position }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const testimonials = [
    {
        quote: "Danial makes your brand look completely professional by creating websites with high speed, lots of animations, and a beautiful appearance.",
        name: "Rahman Jamshidi",
        position: "Founder, Arvand Academy."
    },
    {
        quote: "Danial is very precise in designing the appearance, using the best fonts and colors that match your brand.",
        name: "Mohammad Reza Shakerin",
        position: "Founder, Niyayesh Print."
    },
    {
        quote: "Not only is Danial a professional at his job, but his extensive experience has made websites at their best in terms of security.",
        name: "Ariyan Ebrahimi",
        position: "Developer"
    }
]
</script>