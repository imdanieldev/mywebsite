<template>
    <section id="blog" class="py-20 scroll-mt-20 text-center">
        <h2 data-aos="fade-up"
            class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
            Latest Blog Posts
        </h2>
        <div v-if="pending" class="text-secondary">Loading posts...</div>

        <div v-else-if="error" class="text-red-500">Error loading posts</div>

        <div v-else-if="!posts || posts.length === 0" class="text-secondary">
            No blog posts yet. Check back soon!
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            <NuxtLink v-for="(post, index) in posts" :key="post.path" :to="post.path" :data-aos="'fade-up'"
                :data-aos-delay="(index + 1) * 100"
                class="group bg-bg-card rounded-xl border border-accent-blue/10 transition-all duration-300 hover:border-accent-blue hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] overflow-hidden">
                <div class="p-6">
                    <div class="flex items-center gap-2 text-sm text-secondary mb-3">
                        <time :datetime="post.date">
                            {{ formatDate(post.date) }}
                        </time>
                        <span v-if="post.readingTime">• {{ post.readingTime }}</span>
                    </div>
                    <h3
                        class="text-xl font-semibold text-primary mb-3 group-hover:text-accent-blue transition-colors">
                        {{ post.title }}
                    </h3>
                    <p class="text-secondary mb-4 line-clamp-3">
                        {{ post.description }}
                    </p>
                    <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mb-4">
                        <span v-for="tag in post.tags.slice(0, 3)" :key="tag"
                            class="text-xs px-2 py-1 bg-accent-blue/20 text-accent-cyan rounded-full">
                            {{ tag }}
                        </span>
                    </div>
					<span
						class="flex justify-start gap-x-1 group-hover:gap-x-3 items-center text-accent-cyan font-medium transition-all group-hover:text-accent-blue">
						Read More
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
							viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
								stroke-width="1.5" d="M20 12H4m11 5s5-3.682 5-5s-5-5-5-5" />
						</svg>
					</span>
                </div>
            </NuxtLink>
        </div>
        <div class="mt-12" data-aos="fade-up" data-aos-delay="400">
            <NuxtLink to="/blog"
                class="inline-flex items-center justify-center px-8 py-3 border-2 border-accent-cyan font-semibold rounded-full text-accent-cyan bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-accent-cyan hover:text-dark">
                View All Posts
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
const { data: posts, pending, error } = await useAsyncData('recent-blog-posts', () =>
    queryCollection('blog')
        .select('path', 'title', 'description', 'tags', 'date', 'readingTime', 'featured')
        .where('published', '=', true)
        .order('date', 'DESC')
        .limit(3)
        .all()
)

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>