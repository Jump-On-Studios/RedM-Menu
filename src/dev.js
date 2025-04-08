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
            { title: "menuvariation", current: 1, values: [1, 2, 3, 4] },
            {
              type: "grid",
              labels: ['min', 'max', 'up', 'down'],
              values: [
                { current: 10, min: 1, max: 10 },
              ]
            }
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "palette",
              current: 1,
              tint: "tint_makeup"
            }, {
              type: "palette",
              current: 10,
              tint: "tint_makeup"
            },
            // {
            //   type: "palette",
            //   current: 30,
            //   tint: "tint_makeup"
            // },
          ]
        },
        {

          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
        {
          title: 'test',
          sliders: [
            {
              type: "grid", labels: ['left', 'right'], values: [
                { current: 0.5, max: 1.0, min: -1.0 },
              ]
            },
          ]
        },
      ],
    }
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