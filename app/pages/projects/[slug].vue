<template>
    <div>
        <Navigation />
        <main class="max-w-4xl mx-auto px-4 pt-(--menu-height)">
            <div v-if="pending" class="text-center text-secondary">
                Loading project...
            </div>
            <div v-else-if="error || !project" class="text-center">
                <p class="text-red-500 mb-4">Project not found</p>
            </div>
            <article v-else class="prose prose-invert prose-lg max-w-none py-15">
                <header class="mb-12">
                    <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">
                        {{ project.title }}
                    </h1>
                    <div class="flex flex-wrap items-center gap-4 text-secondary mb-6">
                        <time v-if="project.date" :datetime="project.date">
                            {{ formatDate(project.date) }}
                        </time>

                        <span v-if="project.author">by {{ project.author }}</span>

                        <span v-if="project.readingTime">{{ project.readingTime }}</span>
                    </div>
                    <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-2 mb-6">
                        <span v-for="tag in project.tags" :key="tag"
                            class="text-sm px-3 py-1 bg-accent-blue/20 text-accent-cyan rounded-full">
                            {{ tag }}
                        </span>
                    </div>
                    <div v-if="project.links" class="flex flex-wrap gap-4">
                        <a v-if="project.links.github" :href="project.links.github" target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/80 transition-colors no-underline">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined -->
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5">
                                    <path d="M10 20.568c-3.429 1.157-6.286 0-8-3.568" />
                                    <path
                                        d="M10 22v-3.242c0-.598.184-1.118.48-1.588c.204-.322.064-.78-.303-.88C7.134 15.452 5 14.107 5 9.645c0-1.16.38-2.25 1.048-3.2c.166-.236.25-.354.27-.46c.02-.108-.015-.247-.085-.527c-.283-1.136-.264-2.343.16-3.43c0 0 .877-.287 2.874.96c.456.285.684.428.885.46s.469-.035 1.005-.169A9.5 9.5 0 0 1 13.5 3a9.6 9.6 0 0 1 2.343.28c.536.134.805.2 1.006.169c.2-.032.428-.175.884-.46c1.997-1.247 2.874-.96 2.874-.96c.424 1.087.443 2.294.16 3.43c-.07.28-.104.42-.084.526s.103.225.269.461c.668.95 1.048 2.04 1.048 3.2c0 4.462-2.134 5.807-5.177 6.643c-.367.101-.507.559-.303.88c.296.47.48.99.48 1.589V22" />
                                </g>
                            </svg>
                            View on GitHub
                        </a>
                        <a v-if="project.links.demo" :href="project.links.demo" target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center px-4 py-2 bg-accent-cyan text-dark rounded-lg hover:bg-accent-cyan/80 transition-colors no-underline font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"><!-- Icon from Huge Icons by Hugeicons - undefined -->
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M11.1 3.002c-3.648.007-5.56.096-6.78 1.317C3.002 5.637 3.002 7.758 3.002 12s0 6.363 1.318 7.681c1.317 1.318 3.438 1.318 7.68 1.318s6.363 0 7.68-1.318c1.222-1.22 1.312-3.132 1.318-6.78m-.518-9.383l-5.549 5.534m5.55-5.534c-.495-.495-3.822-.449-4.526-.439m4.525.439c.494.494.448 3.825.438 4.53" />
                            </svg>
                            Live Demo
                        </a>
                    </div>
                </header>
                <ContentRenderer :value="project" class="project-content" />
            </article>
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: project, pending, error } = await useAsyncData(`project-${slug}`, () =>
    queryCollection('projects').path(`/projects/${slug}`).first()
)

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
useHead({
    title: () => project.value ? `${project.value.title} - Danial Nasr` : 'Project - Danial Nasr',
    meta: [
        {
            name: 'description',
            content: () => project.value?.description || 'Project by Danial Nasr'
        }
    ]
})
</script>
<style scoped>
@reference 'tailwindcss';

.project-content :deep(h2) {
    @apply text-3xl font-bold text-[#e2e8f0] mt-12 mb-6;
}

.project-content :deep(h3) {
    @apply text-2xl font-semibold text-[#e2e8f0] mt-8 mb-4;
}

.project-content :deep(p) {
    @apply text-[#94a3b8] leading-relaxed mb-6;
}

.project-content :deep(ul),
.project-content :deep(ol) {
    @apply text-[#94a3b8] mb-6 ml-6;
}

.project-content :deep(li) {
    @apply mb-2;
}

.project-content :deep(a) {
    @apply text-[#06b6d4] hover:text-[#3b82f6] transition-colors;
}

.project-content :deep(code) {
    @apply px-2 py-1 rounded text-sm;
    background-color: color-mix(in srgb, var(--color-bg-card) 85%, var(--color-accent-blue) 15%);
    color: var(--color-accent-cyan);
}

.project-content :deep(pre) {
    position: relative;
    overflow-x: auto;
    margin-bottom: 1.5rem;
    padding: 1.8rem 1.1rem 1rem;
    border-radius: 1rem;
    border: 1px solid color-mix(in srgb, var(--color-accent-blue) 26%, transparent);
    background:
        linear-gradient(180deg,
            color-mix(in srgb, var(--color-accent-blue) 14%, transparent) 0%,
            color-mix(in srgb, var(--color-accent-cyan) 8%, transparent) 26%,
            transparent 26%
        ),
        var(--color-bg-card);
    box-shadow:
        0 14px 30px rgba(2, 6, 23, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.project-content :deep(pre)::before {
    content: '';
    position: absolute;
    top: 0.72rem;
    left: 0.85rem;
    width: 2.2rem;
    height: 0.5rem;
    border-radius: 999px;
    background:
        radial-gradient(circle at 0.25rem 50%, #fb7185 0.2rem, transparent 0.21rem),
        radial-gradient(circle at 1.1rem 50%, #fbbf24 0.2rem, transparent 0.21rem),
        radial-gradient(circle at 1.95rem 50%, #34d399 0.2rem, transparent 0.21rem);
}

.project-content :deep(pre code) {
    @apply bg-transparent p-0;
    display: block;
    margin-top: 0.45rem;
    color: #edf4ff;
    text-shadow: 0 0 0.01px currentColor;
}

.project-content :deep(pre::-webkit-scrollbar) {
    height: 8px;
}

.project-content :deep(pre::-webkit-scrollbar-thumb) {
    background: color-mix(in srgb, var(--color-accent-blue) 44%, transparent);
    border-radius: 999px;
}

:global(html[data-theme='light']) .project-content :deep(pre) {
    box-shadow:
        0 10px 22px rgba(15, 23, 42, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.45);
}

:global(html[data-theme='light']) .project-content :deep(pre code) {
    color: #0f172a;
}

@media (prefers-color-scheme: light) {
    :global(html:not([data-theme])) .project-content :deep(pre) {
        box-shadow:
            0 10px 22px rgba(15, 23, 42, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.45);
    }

    :global(html:not([data-theme])) .project-content :deep(pre code) {
        color: #0f172a;
    }
}

.project-content :deep(blockquote) {
    @apply border-l-4 border-[#3b82f6] pl-6 italic text-[#94a3b8] my-6;
}

.project-content :deep(img) {
    @apply rounded-xl my-8;
}

.project-content :deep(table) {
    @apply w-full mb-6 border-collapse;
}

.project-content :deep(th) {
    @apply bg-[#161b36] text-[#e2e8f0] font-semibold p-3 border border-[#3b82f6]/10;
}

.project-content :deep(td) {
    @apply text-[#94a3b8] p-3 border border-[#3b82f6]/10;
}
</style>
