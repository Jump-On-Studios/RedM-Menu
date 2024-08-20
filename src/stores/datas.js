import { defineStore } from 'pinia'

export const useDataStore = defineStore('datas', {
  state: () => ({
    showMenu: false,
    menuPositionRight: false,
    isQwerty: false
  }),
  actions: {
    defineShow(value) {
      this.showMenu = value
    },
    definePosition(value) {
      this.menuPositionRight = value == "right"
    },
    defineQwerty(value) {
      this.isQwerty = value
    }
  }
})