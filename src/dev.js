import PreviewSlider from "./components/layout/PreviewSlider.vue"

export default {}

let menu = {
  id: 'home',
  title: 'Main title',
  subtitle: 'The menu title',
  numberOnScreen: 8,
  items: [
    {
      title: 'This is the title',
      price: 4,
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      footer: 'footer'
    },
  ]
}

if (import.meta.env.DEV) {
  window.postMessage({
    event: 'updateLang',
  })

  window.postMessage({
    event: 'updateMenu',
    menu: menu
  })

  setTimeout(() => {
    menu.items[0].footer = "new footer"
    window.postMessage({
      event: 'updateMenu',
      menu: menu
    })
  }, 2000);

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