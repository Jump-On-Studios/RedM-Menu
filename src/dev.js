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
              type: "color",
              current: 1,
              values: [
                { palette: "tint_classic", tint0: 1, tint1: 10, tint2: 20 },
                { palette: "tint_classic", tint0: 1, tint1: 10, tint2: 20 },
                { palette: "tint_classic", tint0: 1, tint1: 10, tint2: 20 },
              ]
            }
          ]
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