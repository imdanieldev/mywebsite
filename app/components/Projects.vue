<template>
    <section id="projects" class="py-20 scroll-mt-20 text-center">
        <h2 data-aos="fade-up"
            class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
            Featured Projects
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            <div v-for="(project, index) in projects" :key="index" :data-aos="'zoom-in-up'"
                :data-aos-delay="(index + 1) * 100"
                class="bg-bg-card p-8 rounded-xl border border-accent-blue/10 hover:border-accent-blue hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] h-full flex flex-col">
                <h3 class="text-2xl font-semibold text-primary mb-4">
                    {{ project.title }}
                </h3>
                <p class="text-secondary mb-6 grow">
                    {{ project.description }}
                </p>
                <a :href="project.link" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center text-accent-cyan font-medium hover:text-accent-blue">
                    {{ project.linkText }} →
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const projects = [
    {
        title: 'SaaS Dashboard',
        description: 'A multi-tenant analytics dashboard built with React, TypeScript, and Zustand for state management. Features real-time data visualization using D3.js.',
        link: '#',
        linkText: 'View Project'
    },
    {
        title: 'E-Commerce API',
        description: 'A robust headless RESTful API for an online store, developed with Node.js, Express, and MongoDB. Includes authentication, payment gateways, and inventory management.',
        link: '#',
        linkText: 'View Docs'
    },
    {
        title: 'Portfolio Theme Creator',
        description: 'A simple web application allowing users to generate personalized portfolio themes using CSS variables and local storage.',
        link: '#',
        linkText: 'View Demo'
    }
]
</script>