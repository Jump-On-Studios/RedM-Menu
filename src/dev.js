export default {}

let menu = {
  id: 'home',
  title: 'Main title',
  type: 'tile',
  numberOnLine: 4,
  numberLineOnScreen: 2,
  subtitle: 'The menu title',
  numberOnScreen: 8,
  items: [
    {
      title: 'This is the title',
      icon: "female",
      price: 4,
      description: 'My item description',
      footer: 'footer',
      quantity: 5,
      quantityCircleClass: 'fgold',
      iconClass: 'fgold',
      sliders: [
        {
          type: 'palette',
          tint: 'metaped_tint_generic_clean'
        }
      ]
    },
    {
      title: 'This is the title 2',
      price: 40,
      icon: "male",
      footer: 'footer',
      iconRight: 'tick'
    },
    {
      title: 'This is the title 3',
      price: 4,
      icon: "male",
      footer: 'footer',
      quality: 0,
    },
    {
      title: 'This is the title 4',
      price: 4,
      icon: "male",
      footer: 'footer',
      stars: [3, 4],
      quality: 3,
      starsClass: 'fgold',
      quantity: 5
    },
    {
      title: 'This is the title 5',
      price: 4,
      icon: "male",
      footer: 'footer',
      iconRight: 'star'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer',
      iconRight: 'warning'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
      footer: 'footer'
    },
    {
      title: 'This is the title',
      price: 4,
      icon: "male",
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

  // window.postMessage({
  //   event: 'setCurrentIndex',
  //   menu: 'home',
  //   index: 5
  // })

  setTimeout(function () {

    window.postMessage({
      event: 'setCurrentMenu',
      menu: 'home',
      keepHistoric: true
    })
    window.postMessage({
      event: "updateShow",
      show: true
    })
  }, 200)
}