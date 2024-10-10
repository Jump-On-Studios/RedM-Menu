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
          title: 'Classic item <span>test</span>',
          prefix: 'tick',
          sliders: [
            {
              type: 'sprite',
              title: 'Sprite',
              current: 1,
              values: [
                { sprite: 'tints/BLONDE' },
                { sprite: 'tints/BROWN' },
                { sprite: 'tints/DARK_BLONDE' },
                { sprite: 'tints/DARKEST_BROWN' },
                { sprite: 'tints/DARK_GINGER' },
                { sprite: 'tints/DARK_GREY' },
                { sprite: 'tints/GINGER' },
                { sprite: 'tints/GREY' },
                { sprite: 'tints/JET_BLACK' },
                { sprite: 'tints/LIGHT_BLONDE' },
                { sprite: 'tints/LIGHT_BROWN' },
                { sprite: 'tints/LIGHT_GINGER' },
                { sprite: 'tints/LIGHT_GREY' },
                { sprite: 'tints/MEDIUM_BROWN' },
                { sprite: 'tints/SALT_PEPPER' },
                { sprite: 'tints/STRAWBERRY_BLONDE' },
                { sprite: 'tints/UNCLE_GREY' }
              ]
            },
            {
              type: "grid",
              title: "Opacity",
              labels: ['left', 'right'],
              values: [
                {
                  max: 10,
                  min: 1,
                  current: 5
                }
              ]
            }
          ],
          description: "<div style='overflow-y:scroll;height:100px;'>Test<br>Test<br>Test<br>Test<br>Test<br>Test<br>Test<br></div>"
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
              current: 0,
              tint: 'tint_makeup',
              max: 63
            },
            {
              type: 'palette',
              title: 'tint',
              current: 0,
              tint: 'tint_makeup',
              max: 63
            },
            {
              type: 'palette',
              title: 'tint',
              current: 0,
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
              current: 0,
              tint: 'tint_makeup',
              max: 63
            },
            {
              type: 'palette',
              title: 'tint',
              current: 0,
              tint: 'tint_makeup',
              max: 63
            },
          ]
        },
        {
          title: 'Switch',
          description: 'The item description',
          price: { money: 5.12, gold: 1 },
          child: 'child',
          // disabled: true,
          sliders: [
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
              current: 0,
              tint: 'tint_makeup',
              max: 63
            },
            {
              title: 'Variations',
              current: 2,
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
          icon: 'https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg'
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