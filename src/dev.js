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
          title: 'test'
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