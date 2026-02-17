<template>
	<section id="projects" class="py-20 scroll-mt-20 text-center">
		<h2 data-aos="fade-up"
			class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
			Featured Projects
		</h2>
		<div v-if="pending" class="text-secondary">Loading projects...</div>
		<div v-else-if="error" class="text-red-500">Error loading projects</div>
		<div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
			<NuxtLink v-for="(project, index) in projects" :key="project.path" :to="project.path"
				:data-aos="'zoom-in-up'" :data-aos-delay="140 + index * 120" data-aos-duration="760"
				class="group relative isolate overflow-hidden bg-bg-card p-7 rounded-2xl border border-accent-blue/10 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-cyan/60 hover:shadow-[0_22px_42px_rgba(59,130,246,0.16)] h-full flex flex-col">
				<div
					class="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-cyan/10">
				</div>

				<div class="flex items-start justify-between gap-3 mb-4">
					<span
						class="inline-flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full border border-accent-blue/20 text-accent-cyan bg-dark/40">
						0{{ index + 1 }}
					</span>
					<span v-if="project.date"
						class="text-xs font-semibold tracking-wide text-secondary bg-dark/40 border border-accent-blue/10 rounded-full px-2.5 py-1">
						{{ formatDate(project.date) }}
					</span>
				</div>

				<h3 class="text-xl font-semibold text-primary mb-3 leading-snug group-hover:text-accent-cyan transition-colors">
					{{ project.title }}
				</h3>

				<p class="text-secondary mb-5 grow leading-relaxed">
					{{ project.description }}
				</p>

				<div v-if="project.tags && project.tags.length" class="flex flex-wrap gap-2 mb-5 pt-4 border-t border-accent-blue/10">
					<span v-for="tag in project.tags" :key="tag"
						class="text-xs px-2.5 py-1 bg-accent-blue/15 text-accent-cyan rounded-full border border-accent-blue/15">
						{{ tag }}
					</span>
				</div>

				<div class="flex items-center justify-between mt-auto">
					<span
						class="inline-flex justify-center gap-x-1 group-hover:gap-x-2 items-center text-accent-cyan font-medium transition-all group-hover:text-accent-blue">
						Read More
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-0.5"
							viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
								stroke-width="1.5" d="M20 12H4m11 5s5-3.682 5-5s-5-5-5-5" />
						</svg>
					</span>
					<span class="text-xs text-secondary uppercase tracking-wider">
						Project
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
