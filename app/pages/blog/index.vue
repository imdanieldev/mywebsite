<template>
    <div>
        <Navigation />
        <main class="max-w-container mx-auto px-4 py-20 pt-(--menu-height)">
            <div class="text-center py-15">
                <h1 class="text-5xl md:text-6xl font-bold text-gradient mb-4">
                    Blog
                </h1>
                <p class="text-xl text-secondary max-w-2xl mx-auto">
                    Thoughts on web development, programming, and technology
                </p>
            </div>
            <div class="max-w-2xl mx-auto mb-12">
                <div class="relative">
                    <input v-model="searchQuery" type="text" placeholder="Search posts..."
                        class="w-full px-6 py-4 bg-bg-card border border-accent-blue/20 rounded-full text-primary placeholder-secondary focus:outline-none focus:border-accent-cyan transition-colors" />
                    <svg class="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <div class="mb-12 flex flex-wrap gap-3 justify-center">
                <button @click="selectedTag = null" :class="[
                    'px-5 py-2 rounded-full border-2 font-medium transition-all duration-300 cursor-pointer',
                    selectedTag === null
                        ? 'bg-accent-blue border-accent-blue text-white'
                        : 'border-accent-blue/30 text-secondary hover:border-accent-blue hover:text-accent-blue'
                ]">
                    All Posts
                </button>
                <button v-for="tag in allTags" :key="tag" @click="selectedTag = selectedTag === tag ? null : tag"
                    :class="[
                        'px-5 py-2 rounded-full border-2 font-medium transition-all duration-300 cursor-pointer',
                        selectedTag === tag
                            ? 'bg-accent-blue border-accent-blue text-white'
                            : 'border-accent-blue/30 text-secondary hover:border-accent-blue hover:text-accent-blue'
                    ]">
                    {{ tag }}
                </button>
            </div>
            <div v-if="pending" class="text-center text-secondary">
                Loading posts...
            </div>
            <div v-else-if="error" class="text-center text-red-500">
                Error loading posts
            </div>
            <div v-else-if="filteredPosts.length === 0" class="text-center text-secondary">
                <p class="text-xl mb-4">No posts found</p>
                <p v-if="searchQuery || selectedTag">Try adjusting your filters</p>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <NuxtLink v-for="post in filteredPosts" :key="post.path" :to="post.path"
                    class="group relative isolate bg-bg-card rounded-2xl border border-accent-blue/10 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-cyan/60 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] overflow-hidden">
                    <div
                        class="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br from-accent-blue/10 via-transparent to-accent-cyan/10">
                    </div>

                    <div v-if="post.featured" class="absolute top-4 right-4 z-10">
                        <span class="px-3 py-1 bg-accent-cyan text-dark text-xs font-bold rounded-full">
                            Featured
                        </span>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center justify-between gap-2 text-sm text-secondary mb-3">
                            <time :datetime="post.date">
                                {{ formatDate(post.date) }}
                            </time>
                            <span v-if="post.readingTime"
                                class="text-xs font-semibold px-2 py-1 rounded-full border border-accent-blue/15 bg-dark/40">
                                {{ post.readingTime }}
                            </span>
                        </div>
                        <h3
                            class="text-xl font-semibold text-primary mb-3 group-hover:text-accent-blue transition-colors leading-snug">
                            {{ post.title }}
                        </h3>
                        <p class="text-secondary mb-5 line-clamp-3 leading-relaxed">
                            {{ post.description }}
                        </p>
                        <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mb-5 pt-4 border-t border-accent-blue/10">
                            <span v-for="tag in post.tags.slice(0, 3)" :key="tag"
                                class="text-xs px-2.5 py-1 bg-accent-blue/15 text-accent-cyan rounded-full border border-accent-blue/15">
                                {{ tag }}
                            </span>
                        </div>
                        <span
                            class="inline-flex justify-start gap-x-1 group-hover:gap-x-2 items-center text-accent-cyan font-medium transition-all group-hover:text-accent-blue">
                            Read More
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="1.5" d="M20 12H4m11 5s5-3.682 5-5s-5-5-5-5" />
                            </svg>
                        </span>
                    </div>
                </NuxtLink>
            </div>
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
const selectedTag = ref<string | null>(null)
const searchQuery = ref('')
const { data: posts, pending, error } = await useAsyncData('all-blog-posts', () =>
    queryCollection('blog')
        .select('path', 'title', 'description', 'tags', 'date', 'readingTime', 'featured', 'author')
        .where('published', '=', true)
        .order('date', 'DESC')
        .all()
)
const allTags = computed(() => {
    if (!posts.value) return []

    const tags = new Set<string>()
    posts.value.forEach(post => {
        if (post.tags) {
            post.tags.forEach((tag: string) => tags.add(tag))
        }
    })

    return Array.from(tags).sort()
})
const filteredPosts = computed(() => {
    if (!posts.value) return []

    let filtered = posts.value
    if (selectedTag.value) {
        filtered = filtered.filter(post =>
            post.tags?.includes(selectedTag.value!)
        )
    }
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) ||
            post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
        )
    }

    return filtered
})

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
useHead({
    title: 'Blog - Danial Nasr',
    meta: [
        { name: 'description', content: 'Read articles about web development, programming, and technology by Danial Nasr' }
    ]
})
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
