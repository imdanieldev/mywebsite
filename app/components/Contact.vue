<template>
    <section id="contact" class="py-20 scroll-mt-20 text-center">
        <h2 data-aos="fade-up"
            class="text-4xl md:text-5xl font-bold text-primary mb-12 inline-block border-b-2 border-accent-blue/20 pb-2">
            Get In Touch
        </h2>

        <p data-aos="fade-up" data-aos-delay="100" class="text-secondary mb-8 max-w-2xl mx-auto">
            I am currently available for freelance opportunities or full-time roles.
            Please use the form below to send a direct message.
        </p>

        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 text-left">
            <aside data-aos="fade-right" data-aos-delay="180"
                class="lg:col-span-2 bg-bg-card rounded-2xl border border-accent-blue/10 p-6 md:p-7">
                <h3 class="text-2xl font-semibold text-primary mb-3">
                    Let's build something strong
                </h3>
                <p class="text-secondary mb-6 leading-relaxed">
                    Tell me about your project goals, timeline, and priorities. I usually respond within 24 hours.
                </p>

                <div class="space-y-3">
                    <a href="//wa.me/989944902292" target="_blank" rel="noopener noreferrer"
                        class="flex items-center justify-between rounded-xl border border-accent-blue/15 bg-dark/40 px-4 py-3 transition-all hover:border-accent-cyan/60 hover:-translate-y-0.5">
                        <span class="text-primary font-medium">WhatsApp</span>
                        <span class="text-secondary text-sm">Fast response</span>
                    </a>
                    <a href="//t.me/imdanieln" target="_blank" rel="noopener noreferrer"
                        class="flex items-center justify-between rounded-xl border border-accent-blue/15 bg-dark/40 px-4 py-3 transition-all hover:border-accent-cyan/60 hover:-translate-y-0.5">
                        <span class="text-primary font-medium">Telegram</span>
                        <span class="text-secondary text-sm">Fast response</span>
                    </a>
                </div>

                <div class="mt-6 pt-6 border-t border-accent-blue/10">
                    <p class="text-secondary text-sm mb-3">Also find me on</p>
                    <div class="flex flex-wrap gap-3">
                        <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank"
                            rel="noopener noreferrer"
                            class="px-4 py-2 text-sm text-secondary border border-secondary/30 rounded-lg transition-all duration-300 hover:bg-accent-blue hover:text-white hover:border-accent-blue">
                            {{ link.name }}
                        </a>
                    </div>
                </div>
            </aside>

            <form data-aos="fade-left" data-aos-delay="220" @submit.prevent="handleSubmit"
                class="lg:col-span-3 p-6 md:p-8 bg-bg-card rounded-2xl border border-accent-blue/10 shadow-lg text-left">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                        <label for="name" class="block mb-2 text-primary font-medium">
                            Name
                        </label>
                        <input v-model="formData.name" type="text" id="name" placeholder="Your Name" autocomplete="off"
                            class="w-full px-4 py-3 bg-dark/60 border border-accent-blue/30 rounded-lg text-primary placeholder:text-secondary/70 transition-all focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                    </div>

                    <div>
                        <label for="email" class="block mb-2 text-primary font-medium">
                            Email
                        </label>
                        <input v-model="formData.email" type="text" id="email" placeholder="your.email@example.com"
                            autocomplete="off"
                            class="w-full px-4 py-3 bg-dark/60 border border-accent-blue/30 rounded-lg text-primary placeholder:text-secondary/70 transition-all focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                    </div>
                </div>

                <div class="mb-6">
                    <label for="message" class="block mb-2 text-primary font-medium">
                        Message
                    </label>
                    <textarea v-model="formData.message" id="message" placeholder="Tell me about your project..." rows="6"
                        class="w-full px-4 py-3 bg-dark/60 border border-accent-blue/30 rounded-lg text-primary placeholder:text-secondary/70 resize-y transition-all focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_5px_rgba(6,182,212,0.5)]"></textarea>
                </div>

                <button type="submit"
                    class="outline-0 cursor-pointer w-full md:w-auto inline-flex items-center justify-center px-8 py-3 border-2 border-accent-blue font-semibold rounded-full text-white bg-accent-blue transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.8),0_5px_15px_rgba(0,0,0,0.3)]">
                    Send Message
                </button>

                <div v-if="formMessage" :class="[
                    'mt-4 p-3 rounded-lg font-semibold text-center',
                    formMessage.type === 'success'
                        ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan'
                        : 'bg-red-500/20 text-red-500 border border-red-500'
                ]" role="alert">
                    {{ formMessage.text }}
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
const formData = reactive({
    name: '',
    email: '',
    message: ''
})

const formMessage = ref<{ type: 'success' | 'error'; text: string } | null>(null)

const socialLinks = [
    { name: 'Instagram', url: '//instagram.com/imdanieln2008' },
    { name: 'GitHub', url: '//github.com/imdanieldev' },
    { name: 'Email', url: 'mailto:imdanielng2008@gmail.com' }
]
const phoneNumber = '989944902292'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const checkemail = (email: string) => {
    return emailRegex.test(email);
}
const handleSubmit = () => {
    if (formData.name === '') {
        formMessage.value = {
            type: 'error',
            text: 'Please write your name.'
        }
    } else if (formData.email === '') {
        formMessage.value = {
            type: 'error',
            text: 'Please write your email.'
        }
    } else if (!checkemail(formData.email)) {
        formMessage.value = {
            type: 'error',
            text: 'Please enter a valid email.'
        }
    } else if (formData.message === '') {
        formMessage.value = {
            type: 'error',
            text: 'Please write your message.'
        }
    } else {
        formMessage.value = {
            type: 'success',
            text: `Thank you, ${formData.name}! Your message has been sent successfully, and I will reply soon.`
        }
        console.log('Form Submitted:', formData)
        const fullMessage = `نام: ${formData.name}\nایمیل: ${formData.email}\nپیام: ${formData.message}`
        const encodedMessage = encodeURIComponent(fullMessage)
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
        window.open(whatsappURL, '_blank')
        setTimeout(() => {
            formData.name = ''
            formData.email = ''
            formData.message = ''
            formMessage.value = null
        }, 10000)
    }
}
</script>
