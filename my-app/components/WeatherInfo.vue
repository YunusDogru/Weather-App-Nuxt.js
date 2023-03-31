<script setup>
    import { defineProps, ref } from 'vue'
    import { Icon } from '@iconify/vue';

    const props = defineProps({
        weather: {
            type: Array,
            required: true
        }
    });

    const date = ref(new Date());

    const returnWeekDay = (num) => {
        const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        if(num > 6) {
            return days[num - 7]
        } else {
            return days[num]
        }
    }
    console.log(props.weather);
</script>


<template>
    <div class="weather-details">
        <div class="today">
            <img :src="`https://openweathermap.org/img/wn/${weather[0].weather[0].icon}.png`" alt="icon">
            <div class="temp">
                <span class="strip">TODAY</span>
                <span class="currentTemp">{{Math.floor(weather[0].main.temp) - 273}}&#176;</span>
            </div>
            <div class="details">
                <span class="cloud">
                    <Icon icon="material-symbols:cloud" class="detailsIcon"/><br>
                    {{weather[0].clouds.all}}%
                </span>
                <span class="humidity">
                    <Icon icon="carbon:humidity" class="detailsIcon"/><br>
                    {{weather[0].main.humidity}}%
                </span>
                <span class="wind">
                    <Icon icon="ph:wind" class="detailsIcon"/><br>
                    {{weather[0].wind.speed}}<small>m/s</small>
                </span>
            </div>
        </div>
        <ul class="otherDays">
            <li class="day" v-for="index in [1, 2, 3, 4, 5]" :key="index">
                <span class="strip">{{ returnWeekDay(date.getDay() + index) }}</span>
                <img class="otherDaysImg" :src="`https://openweathermap.org/img/wn/${weather[index * 8 - 1].weather[0].icon}.png`" alt="icon" />
                <span class="nextTemp">{{ Math.floor(weather[index * 8 - 1].main.temp) - 273 }}&#176;</span>
            </li>
        </ul>
    </div>
</template>