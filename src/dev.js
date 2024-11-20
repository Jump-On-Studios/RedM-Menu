import Description from "./components/layout/Description.vue"
import PreviewSliders from "./components/layout/PreviewSlider.vue"

export default {}

if (import.meta.env.DEV) {
  window.postMessage({
    event: 'updateLang',
  })

  window.postMessage({
    event: 'updateMenu',
    menu: {
      id: 'home',
      title: 'Main title',
      subtitle: 'The menu title',
      numberOnScreen: 8,
      items: [
        {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
          sliders: [
            {
              type: "sprite",
              current: 13,
              values: [
                { sprite: "tints/skin_tone_1", value: 1 },
                { sprite: "tints/skin_tone_4", value: 4 },
                { sprite: "tints/skin_tone_3", value: 3 },
                { sprite: "tints/skin_tone_5", value: 5 },
                { sprite: "tints/skin_tone_2", value: 2 },
                { sprite: "tints/skin_tone_6", value: 6 },
                { sprite: "tints/skin_tone_6", value: 6 },
                { sprite: "tints/skin_tone_6", value: 6 },
                { sprite: "tints/skin_tone_6", value: 6 },
                { sprite: "tints/skin_tone_6", value: 6 },
                { sprite: "tints/skin_tone_6", value: 6 },
                { sprite: "tints/skin_tone_6", value: 6 },
                { sprite: "tints/skin_tone_6", value: 6 },
                { sprite: "tints/skin_tone_6", value: 6 },
              ]
            },
          ]
        },

        {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
        },
      ],
    }
  })

  window.postMessage({
    event: 'setCurrentMenu',
    menu: 'home',
    keepHistoric: true
  })

  setTimeout(function () {
    window.postMessage({
      event: "updateShow",
      show: true
    })
  }, 200)
}