<script setup>
  
  import img1 from '~/assets/img/img1.jpg'
  import img2 from '~/assets/img/img2.jpg'
  import img3 from '~/assets/img/img3.jpg'
  import img4 from '~/assets/img/img4.jpg'
  import img5 from '~/assets/img/img5.jpg'
  import img6 from '~/assets/img/img6.jpg'
  import img7 from '~/assets/img/img7.jpg'
  import img8 from '~/assets/img/img8.jpg'
  import img9 from '~/assets/img/img9.jpg'
  import img10 from '~/assets/img/img10.jpg'

  const responses = reactive({ location: {}, weather: []});
  const status = ref(0);
  const backgroundStyle = ref('');
  const weather_app = ref();
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  onMounted(()=>{
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  });

  const onSuccess = async (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    const { data: post } = await useFetch(`https://api.opencagedata.com/geocode/v1/json?q=37.792681512051736+40.77498216426046&key=8e393450d5e241e1a76c05ed77bd6152`);
    responses.location = post._rawValue.results[0].components;
    const { data: post2 } = await useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=92e7719b3b4b9943ab3fee4e9cd0b7c6&lang=en`)
    responses.weather = post2._rawValue.list;
    backgroundStyle.value = `background-image: url(${images[Math.floor(Math.random() * 10) + 1]})`;
    status.value = 1;
    console.log(Math.floor(Math.random() * 10) + 1)
  }
  const onError = () => {
    status.value = 2;
  }

  const onCitySelected = async (key) => {
    const { data: post2 } = await useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${key[0]}&lon=${key[1]}&appid=92e7719b3b4b9943ab3fee4e9cd0b7c6`)
    responses.weather = post2._rawValue.list;
    responses.location.state = key[2];
    responses.location.country = key[3];
    backgroundStyle.value = `background-image: url(${images[Math.floor(Math.random() * 10) + 1]})`;
    status.value = 1;
  }
</script>

<template>
  <div class="weather-app" ref="weather_app" :style="backgroundStyle">
    <template v-if="status === 0">
      <LoadingPage />
    </template>
    <template v-else-if="status === 1">
      <SearchBar @city-selected="onCitySelected" />
      <Location :location="responses.location"/>
      <WeatherInfo :weather="responses.weather"/>
      <img alt="">
    </template>
    <template v-else-if="status === 2">
      <SearchBar @city-selected="onCitySelected" class="onError" />
    </template>
  </div>
</template>
