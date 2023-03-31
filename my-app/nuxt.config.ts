// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '@/assets/scss/main.scss'
    ],
    app: {
        layoutTransition: { name: 'layout', mode: 'out-in' }
    },
    modules: ['nuxt-icon'],
})
