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
              type: "switch",
              current: 1,
              values: [
                { label: '1' },
                { label: '2' },
                { label: '3' },
                { label: '4' },
                { label: '5' },
              ]
            },
          ]
        }
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