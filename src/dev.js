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
                { palette: 'tint_hair', tint0: 0, tint1: 5, tint2: 30 },
                { palette: 'tint_hair', tint0: 10, tint1: 5 },
                { palette: 'tint_hair', tint0: 10 },
              ]
            },
          ]
        }, {
          title: 'This is the title',
          price: 4,
          previewSlider: true,
          sliders: [
            {
              type: "palette",
              current: 1,
              tint: "tint_makeup"
            }, {
              type: "palette",
              current: 10,
              tint: "tint_makeup"
            }, {
              type: "palette",
              current: 30,
              tint: "tint_makeup"
            },
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