<template>
	<section id="projects" class="py-20 scroll-mt-20 text-center">
		<h2 data-aos="fade-up"
			class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
			Featured Projects
		</h2>
		<div v-if="pending" class="text-secondary">Loading projects...</div>
		<div v-else-if="error" class="text-red-500">Error loading projects</div>
		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
			<NuxtLink v-for="(project, index) in projects" :key="project.path" :to="project.path"
				:data-aos="'zoom-in-up'" :data-aos-delay="(index + 1) * 100"
				class="group bg-bg-card p-8 rounded-xl border border-accent-blue/10 hover:border-accent-blue hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] h-full flex flex-col">
				<h3 class="text-xl font-semibold text-primary mb-4">
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
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
							viewBox="0 0 24 24">
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
		<div class="mt-12" data-aos="fade-up" data-aos-delay="400">
			<NuxtLink to="/projects"
				class="inline-flex items-center justify-center px-8 py-3 border-2 border-accent-cyan font-semibold rounded-full text-accent-cyan bg-transparent transition-all duration-300 hover:-translate-y-1 hover:bg-accent-cyan hover:text-dark">
				View All Projects
			</NuxtLink>
		</div>
	</section>
</template>

<script setup lang="ts">
const { data: allProjects, pending, error } = await useAsyncData('random-projects', () =>
	queryCollection('projects')
		.select('path', 'title', 'description', 'tags', 'date')
		.order('date', 'DESC')
		.all()
)

const projects = computed(() => {
	if (!allProjects.value) return []
	const shuffled = [...allProjects.value].sort(() => 0.5 - Math.random())
	return shuffled.slice(0, 3)
})

const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short'
	})
}
</script>