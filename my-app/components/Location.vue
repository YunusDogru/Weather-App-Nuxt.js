<script setup>
    import { defineProps } from 'vue'
    const props = defineProps({
        location: {
            type: Object,
            required: true
        }
})
</script>

<template>
     <div class="location">
            <h3 class="city">{{location.state}}</h3>
            <h5 class="country">{{location.country}}</h5>
        </div>
</template>
