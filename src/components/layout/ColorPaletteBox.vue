<template>
    <div :class="['colorCustom color-' + numberColor,]" :key="keyUpdate" ref="boxParent">
        <div v-for="index in numberColor" :key="index" :class="'tint' + (index - 1)" :style="getStyleTint(index - 1)"></div>
        <div class="border"></div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
const props = defineProps(['palette', 'tint0', 'tint1', 'tint2'])

const numberColor = computed(() => {
    if (props.tint2 !== false && props.tint2 !== undefined)
        return 3
    if (props.tint1 !== false && props.tint1 !== undefined)
        return 2
    return 1
})
const max = ref(1)

const url = computed(() => { return `/assets/images/menu/${props.palette}.png` })

function calculMax() {
    const img = new Image();
    img.src = url.value;

    img.onload = function () {
        max.value = img.naturalWidth - 1; // Largeur originale de l'image
    };
}

onBeforeMount(() => {
    calculMax()
})
watch(url, () => {
    calculMax()
}, { deep: true })

const keyUpdate = computed(() => {
    return props.palette + props.tint0 + (props.tint1 || 0) + (props.tint2 || 0)
})

function getStyleTint(index) {
    let value = props.tint0
    if (index == 1)
        value = props.tint1
    if (index == 2)
        value = props.tint2

    let percent = (value / max.value) * 100
    return {
        backgroundImage: "url(" + url.value + ")",
        backgroundPosition: percent + "% 0px"
    }
}

</script>