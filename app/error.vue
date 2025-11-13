<template>
    <div class="min-h-svh bg-dark flex items-center justify-center px-4 relative overflow-hidden w-full">
        <div
            class="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full pointer-events-none -z-10 blur-[80px] opacity-15 bg-gradient-radial from-accent-blue to-transparent">
        </div>
        <div
            class="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full pointer-events-none -z-10 blur-[80px] opacity-15 bg-gradient-radial from-accent-cyan to-transparent">
        </div>
        <div class="max-w-2xl w-full text-center">
            <div class="mb-8" data-aos="zoom-in">
                <h1 class="text-[150px] md:text-[200px] font-bold leading-none">
                    <span class="text-gradient inline-block animate-pulse">
                        {{ errorCode }}
                    </span>
                </h1>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
                <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                    {{ errorTitle }}
                </h2>
                <p class="text-lg md:text-xl text-text-secondary mb-8 max-w-lg mx-auto">
                    {{ errorMessage }}
                </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up"
                data-aos-delay="200">
                <NuxtLink to="/"
                    class="group inline-flex items-center justify-center px-8 py-3 border-2 border-accent-blue font-semibold rounded-full text-white bg-accent-blue transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.8),0_5px_15px_rgba(0,0,0,0.3)]">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Go Home
                </NuxtLink>
                <button @click="handleGoBack"
                    class="group relative inline-flex items-center justify-center px-8 py-3 border-2 border-accent-cyan font-semibold rounded-full text-accent-cyan bg-transparent overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
                    <span
                        class="absolute inset-0 bg-accent-cyan transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10"></span>
                    <svg class="w-5 h-5 mr-2 relative z-10 transition-colors group-hover:text-dark" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span class="cursor-pointer relative z-10 transition-colors group-hover:text-dark">
                        Go Back
                    </span>
                </button>
            </div>
            <div class="mt-12 pt-8 border-t border-accent-blue/20" data-aos="fade-up" data-aos-delay="300">
                <p class="text-text-secondary mb-4">Or explore these pages:</p>
                <div class="flex flex-wrap gap-3 justify-center">
                    <NuxtLink to="/projects"
                        class="px-4 py-2 bg-bg-card border border-accent-blue/20 rounded-lg text-text-secondary hover:border-accent-blue hover:text-accent-blue transition-all duration-300">
                        Projects
                    </NuxtLink>
                    <NuxtLink to="/blog"
                        class="px-4 py-2 bg-bg-card border border-accent-blue/20 rounded-lg text-text-secondary hover:border-accent-blue hover:text-accent-blue transition-all duration-300">
                        Blog
                    </NuxtLink>
                    <NuxtLink to="/#contact"
                        class="px-4 py-2 bg-bg-card border border-accent-blue/20 rounded-lg text-text-secondary hover:border-accent-blue hover:text-accent-blue transition-all duration-300">
                        Contact
                    </NuxtLink>
                </div>
            </div>
            <div class="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                <div class="absolute top-1/4 left-10 w-20 h-20 border-2 border-accent-blue/20 rounded-lg animate-float">
                </div>
                <div
                    class="absolute bottom-1/4 right-10 w-16 h-16 border-2 border-accent-cyan/20 rounded-full animate-float-delayed">
                </div>
                <div
                    class="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-accent-blue/20 rounded-lg animate-float-slow">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: {
        type: Object as () => NuxtError,
        required: true
    }
})

const errorCode = computed(() => {
    return props.error?.statusCode || 500
})

const errorTitle = computed(() => {
    const code = errorCode.value
    switch (code) {
        case 404:
            return 'Page Not Found'
        case 500:
            return 'Internal Server Error'
        case 403:
            return 'Access Forbidden'
        case 401:
            return 'Unauthorized'
        default:
            return 'Something Went Wrong'
    }
})

const errorMessage = computed(() => {
    const code = errorCode.value
    switch (code) {
        case 404:
            return 'The page you\'re looking for seems to have vanished into the digital void. Let\'s get you back on track!'
        case 500:
            return 'Our servers are having a moment. Don\'t worry, we\'re on it! Please try again later.'
        case 403:
            return 'You don\'t have permission to access this page. If you think this is a mistake, please contact us.'
        case 401:
            return 'You need to be logged in to view this page. Please authenticate and try again.'
        default:
            return props.error?.message || 'An unexpected error occurred. We\'re working to fix it!'
    }
})
const handleGoBack = () => {
    if (window.history.length > 1) {
        window.history.back()
    } else {
        navigateTo('/')
    }
}
const clearError = () => {
    clearError()
    navigateTo('/')
}
useHead({
    title: `${errorCode.value} - ${errorTitle.value}`,
    meta: [
        { name: 'robots', content: 'noindex' }
    ]
})
</script>

<style scoped>
.text-gradient {
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
}

.bg-gradient-radial {
    background: radial-gradient(circle, currentColor, transparent 70%);
}
@keyframes float {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(5deg);
    }
}

@keyframes float-delayed {
    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-30px) rotate(-5deg);
    }
}

@keyframes float-slow {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-15px) rotate(3deg);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float-delayed 8s ease-in-out infinite;
    animation-delay: 1s;
}

.animate-float-slow {
    animation: float-slow 10s ease-in-out infinite;
    animation-delay: 2s;
}
@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.8;
    }
}

.animate-pulse {
    animation: pulse 3s ease-in-out infinite;
}
</style>