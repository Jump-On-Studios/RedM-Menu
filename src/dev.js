import Description from "./components/layout/Description.vue"

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
      title: 'Main title',
      subtitle: 'The menu title',
      numberOnScreen: 8,
      items: [
        {
          title: 'This is the title',
          description: '<img src="/assets/images/icons/accessories.png" />'
        },
        {
          title: 'This is the title',
          subtitle: 'This is the subtitle',
          footer: 'This is the footer',
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
        },

        {
          title: 'This is the title',
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