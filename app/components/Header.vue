<template>
    <header id="home" class="flex flex-col justify-center items-center text-center min-h-svh pt-(--menu-height)">
        <h1 data-aos="fade-up" data-aos-delay="100"
            class="text-5xl md:text-7xl font-extrabold mb-2 leading-tight text-gradient"
            style="text-shadow: 0 0 5px rgba(59, 130, 246, 0.5)">
            Danial Nasr
        </h1>
        <p data-aos="fade-up" data-aos-delay="200" class="text-xl md:text-2xl lg:text-3xl text-secondary mb-8">
            Full-Stack Developer & UI/UX Enthusiast
        </p>
        <p data-aos="fade-up" data-aos-delay="300"
            class="max-w-2xl text-base md:text-lg text-secondary mx-auto mb-10 px-4">
            Passionate about crafting beautiful and functional web experiences. Focusing on clean code,
            minimalist design, and elegant details. I thrive where performance meets polish.
        </p>
        <div data-aos="fade-up" data-aos-delay="400"
            class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#contact" @click="handleLinkClick"
                class="inline-flex items-center justify-center px-8 py-3 border-2 border-accent-blue font-semibold rounded-full text-white bg-accent-blue transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.8),0_5px_15px_rgba(0,0,0,0.3)]">
                Let's Collaborate
            </a>
            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" download=""
                class="group relative inline-flex items-center justify-center px-8 py-3 border-2 border-accent-cyan font-semibold rounded-full text-accent-cyan bg-transparent overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
                <span
                    class="absolute inset-0 bg-accent-cyan transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10"></span>
                <span class="relative z-10 transition-colors group-hover:text-bg-card">
                    Download Resume
                </span>
            </a>
        </div>
    </header>
</template>

<script setup lang="ts">
const handleLinkClick = (e: Event) => {
    e.preventDefault()
    const target = e.currentTarget as HTMLAnchorElement
    const targetId = target.getAttribute('href')?.substring(1)

    if (targetId) {
        const element = document.getElementById(targetId)
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}
</script>