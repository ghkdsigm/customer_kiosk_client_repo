<template>
  <div>
    <div ref="demoBox" class="demobox cursor-grab overflow-hidden relative flex items-center justify-center bg-gray-100 w-64 h-64">
      <div ref="demo" class="pinchable h-16 w-16 bg-blue-400 border-4 border-blue-600 rounded-lg">
        <!-- Content to zoom -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePinch } from '@vueuse/gesture';

const demoBox = ref(null);
const demo = ref(null);

const pinchHandler = ({ offset: [scale, angle] }) => {
  if (demo.value) {
    demo.value.style.transform = `scale(${scale}) rotate(${angle}deg)`;
  }
};

// Use `usePinch` with the correct target
onMounted(() => {
  const p = usePinch(pinchHandler, {
    domTarget: demoBox.value,
    eventOptions: {
      passive: false
    },
  });

  p.config.pinch.bounds[0] = [-900, 1000]
});
</script>

<style>
.demobox {
  background: red;
  width: 100%;
  height: 400px; /* Adjust as needed */
  overflow: hidden;
}

.pinchable {
  width: 100px;
  height: 100px;
  background: green; /* Content color */
}
</style>
