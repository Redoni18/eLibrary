<template>
    <div class="about-us">
            <h2 class="about-header__title">About eLMS</h2>
        <div class="about-us__header">
            <div class="about-us__content">
                <p>
                    The World Bank is a vital source of financial and technical assistance to developing countries around the world. In support of its two goals—to end extreme poverty and boost shared prosperity—the World Bank conducts and publishes a wide range of research and knowledge on developing countries and emerging economies.
                    <br>
                <br>
The World Bank eLibrary is a subscription-based website for institutions and has been serving the unique needs of researchers and librarians since 2003. It is dedicated to offering researchers quick and easy access to the complete collection of World Bank formal publications and journals since the 1990s, as well as reports, working papers, and top data from the World Bank’s World Development Indicators – all in one user-friendly platform. Content in the eLibrary is carefully written and curated to meet the highest academic and editorial standards. eLibrary users are assured full and immediate access to all academic research and scholarship published by the World Bank – the majority of which is made available through a Creative Commons Attribution (CC BY) license.
                </p>
                <router-link type="submit" class="btn btn-primary contact-button" :to="{path: '/contact-us'}">Get in touch</router-link>
            </div>
            <div class="about-us__image">
                <img src="../../assets/8364.jpg" alt="" style="width: 500px;">
            </div>


        </div>
        <l-map style="height: 500px;width:1000px;margin-top:15px;" :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker v-for="(marker,index) in markerLatLng" :key="index" :lat-lng="marker"></l-marker>
        </l-map>
    </div>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import axios from 'axios'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
        latlng: [],
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
            '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 5,
        center: [51.505, -0.159],
        markerLatLng: []
    };
  },
  async mounted() {
    await this.fetchLocations()
  },
  methods: {
    async fetchLocations(){
        const response = await axios.get("http://localhost:8000/api/locations")
        this.locations = response.data
        for(let i = 0;i<this.locations.length;i++){
            this.latlng = []
            if(this.locations[i].latitude && this.locations[i].longitude){

                this.latlng.push(this.locations[i].latitude)
                this.latlng.push(this.locations[i].longitude)
                this.markerLatLng.push(this.latlng)
                this.center = this.markerLatLng[0]
            }
        }
    },
  }
}
</script>


<style scoped>

.about-header__title{
    color: #2d96e0;
    font-weight: 800;
    margin-bottom: 15px;
}

.about-us{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
}
.about-us__header{
    width: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.about-us__content{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.about-us__content .contact-button{
    margin: auto;
    width: 40%;
}
</style>