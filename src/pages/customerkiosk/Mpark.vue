<template>
  <div id="app">
    <PinchScrollZoom
      ref="zoomer"
      :width="300"
      :height="400"
      :scale="scale"
      @scaling="scalingHandler"
      style="border: 1px solid black"
    >
      <img src="https://picsum.photos/600/1000" width="300" height="400" />
    </PinchScrollZoom>
    <PinchScrollZoom
      ref="zoomer"
      :width="300"
      :height="400"
      :scale="scale"
      @scaling="scalingHandler"
      style="border: 1px solid black"
    >
      <img src="https://picsum.photos/600/1000" width="300" height="400" />
    </PinchScrollZoom>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PinchScrollZoom from '@coddicat/vue-pinch-scroll-zoom';

// Create a reference for the PinchScrollZoom component
const zoomer = ref(null);

// Define the scale variable
const scale = ref(2);

// Define the scaling handler method
const scalingHandler = (e) => {
  console.log(e);
};

// Define the reset function
const reset = () => {
  if (zoomer.value) {
    zoomer.value.setData({
      scale: 1,
      originX: 0,
      originY: 0,
      translateX: 0,
      translateY: 0        
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
