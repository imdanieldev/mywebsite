<template>
	<div class="relative selection:bg-accent-cyan selection:text-black overflow-hidden">
		<div class="fixed inset-0 pointer-events-none -z-20 bg-grid-pattern opacity-[0.08]"></div>
		<div class="fixed inset-0 pointer-events-none -z-20 bg-vignette"></div>
		<div
			class="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-radial-blue pointer-events-none -z-10 blur-[80px] opacity-15">
		</div>
		<div
			class="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full pointer-events-none -z-10 blur-[80px] opacity-15 bg-radial-cyan">
		</div>
		<NuxtPage />
	</div>
</template>

<script setup lang="ts">
import { useMenuHeight } from '~/composables/useMenuHeight'
useMenuHeight()
useHead({
	title: "Danial Nasr",
	link: [
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap',
		},
		{
			rel: 'icon',
			type: 'image/png',
			href: '/Me.png'
		}
	],
	meta: [
		{ name: 'description', content: 'Danial Nasr Portfolio.' },
		{ name: 'keywords', content: 'Danial Nasr, Web Developer, Danial, Nasr' },
		{ name: 'author', content: 'Danial Nasr' }
	],
	htmlAttrs: {
		lang: 'en',
	},
})
useSeoMeta({
	title: 'Danial Nasr',
	ogTitle: 'Danial Nasr',
	description: 'Danial Nasr Portfolio.',
	ogDescription: 'Danial Nasr Portfolio.',
	ogImage: '/Me.png',
	twitterCard: 'summary_large_image',
	themeColor: '#3b82f6',
	author: 'Danial Nasr',
	twitterTitle: 'Danial Nasr',
	ogUrl: '/',
	twitterDescription: 'Danial Nasr Prtfolio.',
	twitterImage: '/Me.png'
})
</script>
<style>
.bg-radial-blue {
	background: radial-gradient(circle, #3b82f6, transparent 70%);
}

.bg-radial-cyan {
	background: radial-gradient(circle, #06b6d4, transparent 70%);
}

.bg-grid-pattern {
	background-image:
		linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
		linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
	background-size: 42px 42px;
}

.bg-vignette {
	background: radial-gradient(circle at 50% 20%, transparent 0%, transparent 40%, rgba(2, 6, 23, 0.28) 100%);
}
</style>
