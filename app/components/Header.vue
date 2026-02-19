<template>
    <header id="home"
        class="relative flex flex-col justify-center items-center text-center min-h-svh pt-(--menu-height) overflow-hidden">
        <div class="pointer-events-none absolute inset-0">
            <div class="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-blue/15 blur-3xl">
            </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="100"
            class="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-bg-card/70 px-4 py-2 text-xs font-semibold tracking-wide text-secondary">
            <span class="h-2 w-2 rounded-full bg-accent-cyan relative">
                <span class="h-2 w-2 absolute top-0 left-0 rounded-full bg-accent-cyan animate-ping opacity-30"></span>
            </span>
            Available for freelance & full-time
        </div>

        <h1 data-aos="fade-in" data-aos-delay="180"
            class="text-5xl md:text-7xl font-extrabold mt-6 mb-2 leading-tight text-gradient"
            style="text-shadow: 0 0 5px rgba(59, 130, 246, 0.5)">
            Danial Nasr
        </h1>
        <p data-aos="fade-down" data-aos-delay="260" class="text-xl md:text-2xl lg:text-3xl text-secondary mb-6">
            Full-Stack Developer & UI/UX Enthusiast
        </p>
        <p data-aos="fade-left" data-aos-delay="340"
            class="max-w-2xl text-base md:text-lg text-secondary mx-auto mb-8 px-4">
            I build clean, fast, and conversion-focused web experiences. Minimalist design, sharp interactions, and
            performance-first delivery.
        </p>

        <div data-aos="fade-right" data-aos-delay="420"
            class="flex flex-wrap items-center justify-center gap-3 mb-10 text-sm text-secondary">
            <span class="rounded-full border border-accent-blue/20 bg-bg-card/70 px-3 py-1">Nuxt + Vue</span>
            <span class="rounded-full border border-accent-blue/20 bg-bg-card/70 px-3 py-1">Tailwind CSS</span>
            <span class="rounded-full border border-accent-blue/20 bg-bg-card/70 px-3 py-1">Strapi</span>
            <span class="rounded-full border border-accent-blue/20 bg-bg-card/70 px-3 py-1">Performance</span>
        </div>

        <div data-aos="fade-out" data-aos-delay="500"
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

        <div data-aos="zoom-in" data-aos-delay="580"
            class="mt-12 flex items-center justify-center gap-6 text-xs text-secondary">
            <div class="flex flex-col items-center">
                <span class="text-lg font-semibold text-primary">6+ </span>
                Years Experience
            </div>
            <div class="h-8 w-px bg-accent-blue/30"></div>
            <div class="flex flex-col items-center">
                <span class="text-lg font-semibold text-primary">20+ </span>
                Projects Delivered
            </div>
            <div class="h-8 w-px bg-accent-blue/30"></div>
            <div class="flex flex-col items-center">
                <span class="text-lg font-semibold text-primary">10+ </span>
                Happy Clients
            </div>
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
