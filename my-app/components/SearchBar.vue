<script setup>
    import {ref, watch, defineProps, onMounted } from 'vue'
    import _ from 'lodash';

    const searchValue = ref('');
    const citiesList = ref({})
    const buttonClicked = ref(false);
    const opt = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    const time = ref({
        hour: '',
        minute: '',
        pmam: '',
        formattedDate: ''
    })

    setInterval(()=>{
            let date = new Date();
            time.value = {
                hour: date.getHours() > 12 ? (date.getHours() % 12 >= 10? date.getHours() % 12 : '0' + date.getHours() % 12) : (date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()),
                minute: date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes(),
                pmam: date.getHours() >= 12 ? 'PM' : 'AM',
                formattedDate: date.toLocaleDateString('en-US', opt)
            }
        }, 300)

    watch(searchValue, _.debounce(async () => {
        buttonClicked.value = false;
        const {data: cities} = await useFetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchValue.value}&sort=-population&limit=4`, options);
        citiesList.value = {};
        
        for(let i of cities._rawValue.data) {
            citiesList.value[i.city + ' ' + i.countryCode] = [i.latitude, i.longitude, i.city, i.country]
        }
    }, 700));
    const options = {
        headers: {
            'X-RapidAPI-Key': '7968597372mshdf37cc48361a39bp12ec3cjsnf4c7c7e8c497',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    }

</script>


<template>
    <div class="searchBar">
            <div class="date-time">
                <span class="time">{{time.hour}}<span class="semicolon">:</span>{{time.minute}}<span class="pmam">{{time.pmam}}</span></span>
                <span class="date">{{time.formattedDate}}</span>
            </div>
            <form class="locationInput">
                <input v-model="searchValue" type="text" class="search" placeholder="Search Location..."/>                
                <button type="submit" class="submit" @click.prevent="buttonClicked = true">
                    <Icon name="uil:search" class="searchIcon"/>
                </button>
            </form>
            <ul class="citiesList" v-if="Object.keys(citiesList).length !== 0 && searchValue.length !== 0">
                <li v-for="(index, city) in citiesList" :key="index" @click="$emit('city-selected', index)" class="cityList">
                    {{city}}
                </li>
                <li class="result" v-if="buttonClicked">
                    {{Object.keys(citiesList).length}} results found.
                </li>
            </ul> 
            <span class="loader" v-else-if="Object.keys(citiesList).length === 0 && searchValue.length !== 0"></span>
        </div>
</template>