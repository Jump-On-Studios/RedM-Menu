import { defineStore } from 'pinia'

export const useDataStore = defineStore('datas', {
  state: () => ({
    showMenu: false,
    menuPositionRight: false,
    isQwerty: false,
    openingAnimation: true
  }),
  actions: {
    defineShow(value) {
      this.showMenu = value
    },
    defineOpeningAnimation(value) {
      this.openingAnimation = value
      setTimeout(() => {
        this.openingAnimation = true
      })
    },
    definePosition(value) {
      this.menuPositionRight = value == "right"
    },
    defineQwerty(value) {
      this.isQwerty = value
    }
  }
})