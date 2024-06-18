import { createApp } from 'vue'
import App from './App.vue'
import API from './API'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.provide('API', API)
app.mount('#app')

if (import.meta.env.DEV) {
    window.postMessage({
      event:'updateMenu',
      menu: {
        id: 'home',
        title: 'home',
        translateTitle: false,
        numberOnScreen : 8,
        globalColor: true,
        equipedColor: 1,
        disableEscape: true,
        items: [
          // {
          //   title: 'Palette',
          //   // description: 'test',
          //   price: 5,
          //   // disabled: true,
          //   sliders : [
          //     {
          //       type: 'switch',
          //       current: 1,
          //       values: [
          //         {
          //           label: 'test',price:10,
          //         },
          //         {
          //           label: 'test2'
          //         }
          //       ]
          //     },
          //     {
          //       type: 'palette',
          //       title: 'tint',
          //       current:0,
          //       tint: 'tint_makeup',
          //       max: 63
          //     },
          //     {
          //       type: 'palette',
          //       title: 'tint',
          //       current:0,
          //       tint: 'tint_makeup',
          //       max: 63
          //     },
          //   ],
          // },
         {
            title: 'Palette',
            previewPalette: false,
            // description: 'test',
            // price: 5,
            // sliders : [
            //   {
            //     type: 'palette',
            //     title: 'tint',
            //     current:0,
            //     tint: 'tint_makeup',
            //     max: 63
            //   },
            //   {
            //     type: 'palette',
            //     title: 'tint',
            //     current:0,
            //     tint: 'tint_makeup',
            //     max: 63
            //   },
            //   {
            //     type: 'palette',
            //     title: 'tint',
            //     current:0,
            //     tint: 'tint_makeup',
            //     max: 63
            //   },
            // ],
          },
        ],
      }
    })
    
    window.postMessage({
      event:'setCurrentMenu',
      id: 'home'
    })
  
    setTimeout(function() {
      window.postMessage({
        event:"updateShow",
        show:true
      })
    },200)
  
  }