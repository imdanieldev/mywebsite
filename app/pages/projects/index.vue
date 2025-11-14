<template>
    <div>
        <Navigation />
        <main class="max-w-container mx-auto px-4 py-20 pt-(--menu-height)">
            <div class="text-center py-15">
                <h1 class="text-5xl md:text-6xl font-bold text-gradient mb-4">
                    All Projects
                </h1>
                <p class="text-xl text-secondary max-w-2xl mx-auto">
                    A showcase of my work across different technologies
                </p>
            </div>
            <div class="mb-12 flex flex-wrap gap-4 justify-center">
                <button v-for="tag in allTags" :key="tag" @click="selectedTag = selectedTag === tag ? null : tag"
                    :class="[
                        'px-4 py-2 rounded-full border-2 transition-all duration-300 cursor-pointer',
                        selectedTag === tag
                            ? 'bg-accent-blue border-accent-blue text-white'
                            : 'border-accent-blue/30 text-secondary hover:border-accent-blue hover:text-accent-blue'
                    ]">
                    {{ tag }}
                </button>
            </div>
            <div v-if="pending" class="text-center text-secondary">
                Loading projects...
            </div>

            <div v-else-if="error" class="text-center text-red-500">
                Error loading projects
            </div>

            <div v-else-if="filteredProjects.length === 0" class="text-center text-secondary">
                No projects found for this filter
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <NuxtLink v-for="project in filteredProjects" :key="project.path" :to="project.path"
                    class="group bg-bg-card p-8 rounded-xl border border-accent-blue/10 transition-all duration-300 hover:-translate-y-2 hover:border-accent-blue hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] h-full flex flex-col">
                    <h3 class="text-2xl font-semibold text-primary mb-4">
                        {{ project.title }}
                    </h3>
                    <p class="text-secondary mb-6 grow">
                        {{ project.description }}
                    </p>
                    <div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-2 mb-4">
                        <span v-for="tag in project.tags" :key="tag"
                            class="text-xs px-2 py-1 bg-accent-blue/20 text-accent-cyan rounded-full">
                            {{ tag }}
                        </span>
                    </div>

                    <div class="flex items-center justify-between">
                        <span
                            class="flex justify-center gap-x-1 group-hover:gap-x-3 items-center text-accent-cyan font-medium transition-all group-hover:text-accent-blue">
                            Read More
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5" d="M20 12H4m11 5s5-3.682 5-5s-5-5-5-5" />
                            </svg>
                        </span>

                        <span v-if="project.date" class="text-sm text-secondary">
                            {{ formatDate(project.date) }}
                        </span>
                    </div>
                </NuxtLink>
            </div>
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedTag = ref<string | null>(null)
const { data: projects, pending, error } = await useAsyncData('all-projects', () =>
    queryCollection('projects')
        .select('path', 'title', 'description', 'tags', 'date')
        .order('date', 'DESC')
        .all()
)

const allTags = computed(() => {
    if (!projects.value) return []

    const tags = new Set<string>()
    projects.value.forEach(project => {
        if (project.tags) {
            project.tags.forEach((tag: string) => tags.add(tag))
        }
    })

    return Array.from(tags).sort()
})
const filteredProjects = computed(() => {
    if (!projects.value) return []
    if (!selectedTag.value) return projects.value

    return projects.value.filter(project =>
        project.tags?.includes(selectedTag.value!)
    )
})

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short'
    })
}
useHead({
    title: 'All Projects - Danial Nasr',
    meta: [
        { name: 'description', content: 'Browse all projects by Danial Nasr, Full-Stack Developer' }
    ]
})
</script>