<template>
  <div>
  <div>
  <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;">
      <gmap-marker v-for="(item,key) in coordinates" :key="key" :position="getPosition(item)" :clickable="true" @click="clickToOpen(show,item.full_name)"></gmap-marker>
    </gmap-map>
</div>
<br>
<div v-show="show">
  <h2>{{ title }}</h2>
  <vue-web-cam
                        ref="webcam"
                        :device-id="deviceId"
                        width="100%"
                        @started="onStarted"
                        @stopped="onStopped"
                        @error="onError"
                        @cameras="onCameras"
                        @camera-change="onCameraChange"
                    />
</div>
  </div>
</template>

<script>
import { WebCam } from "vue-web-cam";
export default {
  name: 'Home',
  components: {
    'vue-web-cam' : WebCam
  },
  data () {
    return {
      show:false,
      title: "",
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      coordinates : {
        0 : {
          full_name: "CCTV 1",
          lat: '-6.914744',
          lng: '107.609810'
        },
        1: {
          full_name: "CCTV 2",
          lat: '-6.899541',
          lng: '107.533867'
        }
      }
    }
  },
  mounted() {
    this.geolocate();
  },
  computed: {
        device: function() {
            return this.devices.find(n => n.deviceId === this.deviceId);
        }
    },
    watch: {
        camera: function(id) {
            this.deviceId = id;
        },
        devices: function() {
            // Once we have a list select the first one
            const [first] = this.devices;
            if (first) {
                this.camera = first.deviceId;
                this.deviceId = first.deviceId;
            }
        }
    },
  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    getPosition:function(marker){
        return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    clickToOpen: function(show,title){
      this.show = true;
      this.title = title;
    },

    onCapture() {
            this.img = this.$refs.webcam.capture();
        },
        onStarted(stream) {
            console.log("On Started Event", stream);
        },
        onStopped(stream) {
            console.log("On Stopped Event", stream);
        },
        onStop() {
            this.$refs.webcam.stop();
        },
        onStart() {
            this.$refs.webcam.start();
        },
        onError(error) {
            console.log("On Error Event", error);
        },
        onCameras(cameras) {
            this.devices = cameras;
            console.log("On Cameras Event", cameras);
        },
        onCameraChange(deviceId) {
            this.deviceId = deviceId;
            this.camera = deviceId;
            console.log("On Camera Change Event", deviceId);
        }
  }
}
</script>
