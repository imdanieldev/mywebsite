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

        <form data-aos="fade-up" data-aos-delay="200" @submit.prevent="handleSubmit"
            class="max-w-xl mx-auto p-8 bg-bg-card rounded-xl border border-accent-blue/10 shadow-lg text-left">
            <div class="mb-6">
                <label for="name" class="block mb-2 text-primary font-medium">
                    Name
                </label>
                <input v-model="formData.name" type="text" id="name" placeholder="Your Name" autocomplete="off"
                    class="w-full px-4 py-3 bg-[#0d122b] border border-accent-blue/30 rounded-lg text-primary transition-all focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
            </div>

            <div class="mb-6">
                <label for="email" class="block mb-2 text-primary font-medium">
                    Email
                </label>
                <input v-model="formData.email" type="text" id="email" placeholder="your.email@example.com" autocomplete="off"
                    class="w-full px-4 py-3 bg-[#0d122b] border border-accent-blue/30 rounded-lg text-primary transition-all focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
            </div>

            <div class="mb-6">
                <label for="message" class="block mb-2 text-primary font-medium">
                    Message
                </label>
                <textarea v-model="formData.message" id="message" placeholder="I'd like to discuss..." rows="5"
                    class="w-full px-4 py-3 bg-[#0d122b] border border-accent-blue/30 rounded-lg text-primary resize-y transition-all focus:outline-none focus:border-accent-cyan focus:shadow-[0_0_5px_rgba(6,182,212,0.5)]"></textarea>
            </div>

            <button type="submit"
                class="outline-0 cursor-pointer w-full inline-flex items-center justify-center px-8 py-3 border-2 border-accent-blue font-semibold rounded-full text-white bg-accent-blue transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.8),0_5px_15px_rgba(0,0,0,0.3)]">
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

        <div data-aos="fade-up" data-aos-delay="300" class="flex flex-wrap gap-4 justify-center mt-10">
            <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" rel="noopener noreferrer"
                class="px-6 py-3 text-secondary border border-secondary/30 rounded-lg transition-all duration-300 hover:bg-accent-blue hover:text-white hover:border-accent-blue hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(59,130,246,0.3)]">
                {{ link.name }}
            </a>
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
    { name: 'Whatsapp', url: '//wa.me/989944902292' },
    { name: 'GitHub', url: '//github.com/imdanieldev' },
    { name: 'Telegram', url: '//t.me/imdanieln' }
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