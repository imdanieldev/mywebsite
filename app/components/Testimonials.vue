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
                    <span class="text-accent-cyan text-4xl block mb-4">“</span>
                    <p class="italic text-primary mb-6 grow">
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
        quote: "Danial was an invaluable asset to our project. Not only is he a phenomenal coder, but he also possesses a deep understanding of business needs and consistently delivers creative solutions.",
        name: "Ali Mohammadi",
        position: "Product Manager, Data Process Co."
    },
    {
        quote: "Danial's speed and quality of work exceeded our expectations. He quickly implemented a complex dashboard with incredible precision and detail.",
        name: "Sara Ghasemi",
        position: "Founder, Health Startup"
    },
    {
        quote: "What I admire most about working with Danial is his focus on performance optimization and user experience. The result is truly smooth and enjoyable to use.",
        name: "Reza Karimi",
        position: "Development Lead, Alif Trading Co."
    }
]
</script>