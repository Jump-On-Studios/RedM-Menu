export default {}

if (import.meta.env.DEV) {
  window.postMessage({
    event: 'updateLang',
    lang: {
      price: "New"
    }
  })

  window.postMessage({
    event: 'updateMenu',
    menu: {
      id: 'home',
      title: 'My title',
      subtitle: 'The subtitle',
      numberOnScreen: 8,
      items: [
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right', 'up', 'down'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
                { current: 0.5, max: 10.0, min: 0.0 },
              ]
            },
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        }
      ],
    }
  })

  window.postMessage({
    event: 'updateMenu',
    menu: {
      id: 'child',
      title: 'ChildMenu',
      subtitle: 'Subtitle 2',
      numberOnScreen: 8,
      globalColor: true,
      equipedColor: 1,
      disableEscape: true,
      items: [
        {
          title: 'Child',
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