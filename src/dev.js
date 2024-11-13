import Description from "./components/layout/Description.vue"

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
          description: '<img src="/assets/images/icons/accessories.png" />',
          footer: 'Footer',
          textRight: "<span style='color:red'>test</span>"
        },
        {
          title: 'This is the title',
          subtitle: 'This is the subtitle',
          footer: 'This is the footer',
          price: 5,
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
          price: 4
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