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
          title: 'Statistics<br>Line'
        },
        {
          title: 'Two<br><br>Lines'
        },
        {
          title: '1<br>2<br>3<br>4<br>5'
        },
        {
          title: 'Statistics'
        },
        {
          title: 'Statistics'
        },
        {
          title: 'Statistics'
        },
        {
          title: 'Statistics'
        },
        {
          title: 'Statistics'
        },
        {
          title: 'Statistics'
        },
        {
          title: 'Statistics'
        },
        {
          title: 'Palette',
          description: 'The item description',
          price: 5,
          child: 'child',
          // disabled: true,
          sliders : [
            {
              type: 'switch',
              current: 1,
              values: [
                {
                  label: 'test',price:10,
                },
                {
                  label: 'test2'
                }
              ]
            },
            {
              type: 'grid',
              title: 'tint',
              current:0,
              labels: ['left','right'],
              values: [
                {current: 0.5, max: 1.0, min: -1.0},
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
    menu: 'home'
  })

  setTimeout(function() {
    window.postMessage({
      event:"updateShow",
      show:true
    })
  },200)
}