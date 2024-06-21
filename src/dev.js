export default {}

if (import.meta.env.DEV) {
  window.postMessage({
    event:'updateMenu',
    menu: {
      id: 'home',
      title: 'My title',
      subtitle: 'The subtitle',
      numberOnScreen : 8,
      items: [
        {
          title: 'Classic item',
          prefix: 'tick'
        },
        {
          title: 'Classic item',
          prefix: 'tick'
        },
        {
          title: 'Title',
          textRight: "Right text"
        },
        {
          title: 'Classic item',
          prefix: 'tick'
        },
        {
          title: 'Sliders',
          sliders: [
            {
              type: 'palette',
              title: 'tint',
              current:0,
              tint: 'tint_makeup',
              max: 63
            },
            {
              type: 'palette',
              title: 'tint',
              current:0,
              tint: 'tint_makeup',
              max: 63
            },
            {
              type: 'palette',
              title: 'tint',
              current:0,
              tint: 'tint_makeup',
              max: 63
            },
          ]
        },
        {
          title: 'Sliders',
          sliders: [
            {
              type: 'palette',
              title: 'tint',
              current:0,
              tint: 'tint_makeup',
              max: 63
            },
            {
              type: 'palette',
              title: 'tint',
              current:0,
              tint: 'tint_makeup',
              max: 63
            },
          ]
        },
        {
          title: 'Switch',
          description: 'The item description',
          price: {money:5.12, gold:1},
          child: 'child',
          // disabled: true,
          sliders : [
            {
              type: 'switch',
              current: 1,
              values: [
                {
                  label: 'value 1',
                },
                {
                  label: 'value 2'
                }
              ]
            },
            {
              type: 'palette',
              title: 'tint',
              current:0,
              tint: 'tint_makeup',
              max: 63
            },
            {
              title: 'Variations',
              current:2,
              values: [
                {},
                {},
                {},
                {},
                {},
                {},
              ]
            },
          ],
        },
        {
          title: 'With Icon',
          icon: 'makeup'
        }
      ],
    }
  })

  window.postMessage({
    event:'updateMenu',
    menu: {
      id: 'child',
      title: 'ChildMenu',
      subtitle: 'Subtitle 2',
      numberOnScreen : 8,
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
    event:'setCurrentMenu',
    menu: 'home',
    keepHistoric: true
  })

  setTimeout(function() {
    window.postMessage({
      event:"updateShow",
      show:true
    })
  },200)
}