<template>
    <div>
        <Navigation />
        <main class="max-w-4xl mx-auto px-4 py-20 pt-(--menu-height)">
            <div v-if="pending" class="text-center text-secondary">
                Loading post...
            </div>
            <div v-else-if="error || !post" class="text-center">
                <p class="text-red-500 mb-4">Post not found</p>
            </div>

            <article v-else class="prose prose-invert prose-lg max-w-none py-15">
                <header class="mb-12">
                    <h1 class="text-4xl md:text-5xl font-bold text-primary mb-6">
                        {{ post.title }}
                    </h1>
                    <div
                        class="flex flex-wrap items-center gap-4 text-secondary pb-6 border-b border-accent-blue/20">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{{ post.author || 'Danial Nasr' }}</span>
                        </div>

                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <time :datetime="post.date">
                                {{ formatDate(post.date) }}
                            </time>
                        </div>

                        <div v-if="post.readingTime" class="flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{{ post.readingTime }}</span>
                        </div>
                    </div>
                    <p class="text-xl text-secondary mt-6 mb-8">
                        {{ post.description }}
                    </p>
                    <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mb-6">
                        <div v-for="tag in post.tags" :key="tag"
                            class="text-sm px-3 py-1 bg-accent-blue/20 text-accent-cyan rounded-full hover:bg-accent-blue/30 transition-colors no-underline">
                            {{ tag }}
                        </div>
                    </div>
                </header>
                <ContentRenderer :value="post" class="blog-content" />
                <footer class="mt-16 pt-8 border-t border-accent-blue/20">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h3 class="text-lg font-semibold text-primary mb-2">Share this post</h3>
                            <div class="flex gap-3">
                                <a :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`"
                                    target="_blank" rel="noopener noreferrer"
                                    class="p-2 bg-bg-card border border-accent-blue/20 rounded-lg hover:border-accent-blue transition-colors"
                                    aria-label="Share on Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M2 18.5C3.765 19.521 5.814 20 8 20c6.48 0 11.762-5.137 11.992-11.562L22 4.5l-3.354.5A4 4 0 0 0 16 4c-2.572 0-4.5 2.517-3.88 4.98c-3.552.23-6.771-1.959-8.633-4.875c-1.236 4.197-.09 9.251 3.013 12.366c0 1.176-3 1.878-4.5 2.029Z" />
                                    </svg>
                                </a>
                                <a :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`"
                                    target="_blank" rel="noopener noreferrer"
                                    class="p-2 bg-bg-card border border-accent-blue/20 rounded-lg hover:border-accent-blue transition-colors"
                                    aria-label="Share on LinkedIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
                                        <g fill="none" stroke="currentColor" stroke-width="1.5">
                                            <path
                                                d="M4.5 9.5H4c-.943 0-1.414 0-1.707.293S2 10.557 2 11.5V20c0 .943 0 1.414.293 1.707S3.057 22 4 22h.5c.943 0 1.414 0 1.707-.293S6.5 20.943 6.5 20v-8.5c0-.943 0-1.414-.293-1.707S5.443 9.5 4.5 9.5Zm2-5.25a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0Z" />
                                            <path stroke-linejoin="round"
                                                d="M12.326 9.5H11.5c-.943 0-1.414 0-1.707.293S9.5 10.557 9.5 11.5V20c0 .943 0 1.414.293 1.707S10.557 22 11.5 22h.5c.943 0 1.414 0 1.707-.293S14 20.943 14 20v-3.5c0-1.657.528-3 2.088-3c.78 0 1.412.672 1.412 1.5v4.5c0 .943 0 1.414.293 1.707s.764.293 1.707.293h.499c.942 0 1.414 0 1.707-.293c.292-.293.293-.764.293-1.706L22 14c0-2.486-2.364-4.5-4.703-4.5c-1.332 0-2.52.652-3.297 1.673c0-.63 0-.945-.137-1.179a1 1 0 0 0-.358-.358c-.234-.137-.549-.137-1.179-.137Z" />
                                        </g>
                                    </svg>
                                </a>
                                <a :href="`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`"
                                    target="_blank" rel="noopener noreferrer"
                                    class="p-2 bg-bg-card border border-accent-blue/20 rounded-lg hover:border-accent-blue transition-colors"
                                    aria-label="Share on Telegram">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="1.5"
                                            d="m11.985 15.408l3.242 3.686c1.2 1.365 1.801 2.048 2.43 1.881c.628-.166.844-1.064 1.275-2.861l2.39-9.968c.665-2.768.997-4.151.259-4.834s-2.017-.175-4.575.84L5.14 8.865c-2.046.813-3.069 1.219-3.134 1.917a1 1 0 0 0 0 .214c.063.699 1.084 1.108 3.128 1.927c.925.371 1.388.557 1.72.912q.056.06.108.124c.306.38.436.88.697 1.876l.489 1.867c.253.97.38 1.456.713 1.522s.622-.336 1.201-1.141zm0 0l-.317-.33c-.362-.378-.543-.566-.543-.8s.18-.423.543-.8l3.573-3.724" />
                                    </svg>
                                </a>
                                <a :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20${encodeURIComponent(currentUrl)}`"
                                    target="_blank" rel="noopener noreferrer"
                                    class="p-2 bg-bg-card border border-accent-blue/20 rounded-lg hover:border-accent-blue transition-colors"
                                    aria-label="Share on WhatsApp">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
                                        <g fill="none" stroke="currentColor" stroke-width="1.5">
                                            <path stroke-linejoin="round"
                                                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.379.28 2.693.784 3.888c.279.66.418.99.436 1.24c.017.25-.057.524-.204 1.073L2 22l3.799-1.016c.549-.147.823-.22 1.073-.204c.25.018.58.157 1.24.436A10 10 0 0 0 12 22Z" />
                                            <path
                                                d="m8.588 12.377l.871-1.081c.367-.456.82-.88.857-1.488c.008-.153-.1-.841-.315-2.218C9.916 7.049 9.41 7 8.973 7c-.57 0-.855 0-1.138.13c-.358.163-.725.622-.806 1.007c-.064.305-.016.515.079.935c.402 1.783 1.347 3.544 2.811 5.009c1.465 1.464 3.226 2.409 5.01 2.811c.42.095.629.143.934.079c.385-.08.844-.448 1.008-.806c.129-.283.129-.568.129-1.138c0-.438-.049-.943-.59-1.028c-1.377-.216-2.065-.323-2.218-.315c-.607.036-1.032.49-1.488.857l-1.081.87" />
                                        </g>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </article>
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const currentUrl = computed(() => {
    return window.location.href
})

const { data: post, pending, error } = await useAsyncData(`blog-${slug}`, () =>
    queryCollection('blog')
        .path(`/blog/${slug}`)
        .first()
)

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
useHead({
    title: () => post.value ? `${post.value.title} - Danial Nasr` : 'Blog Post - Danial Nasr',
    meta: [
        {
            name: 'description',
            content: () => post.value?.description || 'Blog post by Danial Nasr'
        },
        {
            property: 'og:title',
            content: () => post.value?.title || 'Blog Post'
        },
        {
            property: 'og:description',
            content: () => post.value?.description || 'Blog post by Danial Nasr'
        }
    ]
})
</script>

<style scoped>
@reference 'tailwindcss';

.blog-content :deep(h2) {
    @apply text-3xl font-bold text-[#e2e8f0] mt-12 mb-6;
}

.blog-content :deep(h3) {
    @apply text-2xl font-semibold text-[#e2e8f0] mt-8 mb-4;
}

.blog-content :deep(p) {
    @apply text-[#94a3b8] leading-relaxed mb-6;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
    @apply text-[#94a3b8] mb-6 ml-6;
}

.blog-content :deep(li) {
    @apply mb-2;
}

.blog-content :deep(a) {
    @apply text-[#06b6d4] hover:text-[#3b82f6] transition-colors;
}

.blog-content :deep(code) {
    @apply bg-[#161b36] px-2 py-1 rounded text-[#06b6d4] text-sm;
}

.blog-content :deep(pre) {
    @apply bg-[#161b36] p-4 rounded-xl overflow-x-auto mb-6 border border-[#3b82f6]/10;
}

.blog-content :deep(pre code) {
    @apply bg-transparent p-0;
}

.blog-content :deep(blockquote) {
    @apply border-l-4 border-[#3b82f6] pl-6 italic text-[#94a3b8] my-6;
}

.blog-content :deep(img) {
    @apply rounded-xl my-8;
}

.blog-content :deep(table) {
    @apply w-full mb-6 border-collapse;
}

.blog-content :deep(th) {
    @apply bg-[#161b36] text-[#e2e8f0] font-semibold p-3 border border-[#3b82f6]/10;
}

.blog-content :deep(td) {
    @apply text-[#94a3b8] p-3 border border-[#3b82f6]/10;
}

.blog-content :deep(strong) {
    @apply text-[#e2e8f0] font-semibold;
}

.blog-content :deep(em) {
    @apply italic;
}
</style>