<template>
    <!-- Directive usage -->
    <div ref="demo2" style="height: 300px; width: 300px; background-color: red">
        <div ref="demo" v-pinch="pinchHandler" style="height: 150px; width: 150px; background-color: blue" />
        <div ref="dragGo" v-drag="dragHandler" style="height: 150px; width: 150px; background-color: black" />
    </div>
</template>
 
<script setup>
import { ref } from 'vue'
import { usePinch, useDrag } from '@vueuse/gesture'
import { useMotionProperties, useSpring } from '@vueuse/motion'
const demo = ref()
const demo2 = ref()
const dragGo = ref()
 
// Find more about `set()` on the "Motion Integration" page
const { motionProperties } = useMotionProperties(dragGo, {
    cursor: 'grab',
    x: 0,
    y: 0,
})
 
const { set } = useSpring(motionProperties)
 
const pinchHandler = ({ offset: [d, a], pinching }) => {
    set({ zoom: d, rotateZ: a })
}
const dragHandler = ({ movement: [x, y], dragging }) => {
    if (!dragging) {
        set({ x: 0, y: 0, cursor: 'grab' })
        return
    }
 
    set({
        cursor: 'grabbing',
        x,
        y,
    })
}
 
// Composable usage
usePinch(pinchHandler, {
    domTarget: demo,
    eventOptions: {
        passive: true,
    },
})
useDrag(dragHandler, {
    domTarget: dragGo,
})
</script>