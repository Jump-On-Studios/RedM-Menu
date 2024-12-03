<template>
    <div :class="['colorCustom color-' + numberColor, props.style]" :key="keyUpdate" ref="boxParent">
        <div v-for="index in numberColor" :key="index" :class="'tint' + (index - 1)" :style="getStyleTint(index - 1)"></div>
        <div class="border"></div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
const props = defineProps(['color'])
const tint = computed(() => {
    const tints = [props.color.tint0]
    if (Number.isInteger(props.color.tint1))
        tints.push(props.color.tint1)
    if (Number.isInteger(props.color.tint2))
        tints.push(props.color.tint2)
    return {
        palette: props.color.palette,
        tints: tints
    }
})

const numberColor = computed(() => { return tint.value.tints.length })
const url = computed(() => { return `/assets/images/menu/${props.color.palette}.png` })

const max = ref(1)
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
})

const keyUpdate = computed(() => { return tint.value.palette + tint.value.tints.reduce((a, b) => a + b, 0) })

function getStyleTint(index) {
    let value = tint.value.tints[index]

    let percent = (value / max.value) * 100
    return {
        backgroundImage: "url(" + url.value + ")",
        backgroundPosition: percent + "% 0px"
    }
}

</script>