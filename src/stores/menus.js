import { defineStore } from 'pinia'
import API from '../API'

class MenuItem {
  title = '';
  subtitle = '';
  footer = '';
  icon = false;
  iconRight = false;
  iconClass = '';
  child = false;
  sliders = [];
  price = false;
  priceTitle = false;
  priceRight = false;
  data = {};
  preview = false;
  index = 0;
  visible = true;
  description = '';
  action = false;
  translate = false;
  translateDescription = false;
  prefix = false;
  statistics = [];
  disabled = false;
  grid = false;
  id = 0;
  textRight = false;
  textRightClass = '';
  translateTextRight = false;
  previewSlider = false;
  refreshKey = 0;

  constructor(id) {
    this.id = id

    this.refreshKey = Math.random()
  }

  setTitle(title) {
    this.title = title
  }

  setIcon(icon) {
    this.icon = icon
  }
  setSliders(sliders) {
    this.sliders = []

    sliders = Array.isArray(sliders) ? sliders : [sliders]

    sliders.forEach(slid => {
      this.sliders.push({ ...{ current: 0, values: [], offset: 0, translate: false, type: 'slider', looped: true }, ...slid })
    })
  }
  setChild(value) {
    this.child = value
  }
  setPrice(price) {
    this.price = price
  }
  setData(data) {
    this.data = data
  }
  setPreview(value) {
    this.preview = value
  }
  setIndex(value) {
    this.index = value
  }
  setVisible(value) {
    this.visible = value
  }
  setDescription(value) {
    this.description = value
  }
  setAction(value) {
    this.action = value
  }
  setTranslate(value) {
    this.translate = value
  }
  setTranslateDescription(value) {
    this.translateDescription = value
  }
  setData(data) {
    this.data = data
  }
  setPrefix(value) {
    this.prefix = value
  }
  setStatistics(values) {
    const stat = new ItemStatistic()
    for (var p in values) {
      this.statistics.push({ ...stat, ...values[p] })
    }
  }
  setIconClass(value) {
    this.iconClass = value
  }
  setDisabled(value) {
    this.disabled = value
  }
  setIconRight(value) {
    this.iconRight = value
  }
  setPriceTitle(value) {
    this.priceTitle = value
  }
  setPriceRight(value) {
    this.priceRight = value
  }
  setGrid(value) {
    this.grid = value
  }
  setTextRight(value) {
    this.textRight = value
  }
  setTextRightClass(value) {
    this.textRightClass = value
  }
  setTranslateTextRight(value) {
    this.translateTextRight = value
  }
  setSubtitle(value) {
    this.subtitle = value
  }
  setFooter(value) {
    this.footer = value
  }
  setPreviewSlider(value) {
    this.previewSlider = value
  }
}

class ItemStatistic {
  label = ""
  type = "bar"
  class = ""
  value = [0, 0, 10]
  translateLabel = false
  translateValue = false
}

class Menu {
  title = "Menu";
  id = 'id'
  translateTitle = false;
  subtitle = "Elements";
  translateSubtitle = false;
  type = "list";
  currentIndex = 0;
  equipedItem = {
    index: -1,
    variation: -1
  };
  items = [];
  currentColor = 0;
  numberOnScreen = 8;
  globalColor = false;
  equipedColor = 0;
  disableEscape = true;
  refreshKey = 0;

  constructor(data) {
    this.setTitle(data.title);
    this.id = data.id
    if (data.items) {
      data.items.forEach(item => {
        let newId = this.items.push(new MenuItem(this.items.length)) - 1
        if (item.title) this.items[newId].setTitle(item.title)
        if (item.subtitle) this.items[newId].setSubtitle(item.subtitle)
        if (item.footer) this.items[newId].setFooter(item.footer)
        if (item.icon) this.items[newId].setIcon(item.icon)
        if (item.slider) this.items[newId].setSliders(item.slider)
        if (item.sliders) this.items[newId].setSliders(item.sliders)
        if (item.child) this.items[newId].setChild(item.child)
        if (item.price !== false) this.items[newId].setPrice(item.price)
        if (item.priceRight !== false) this.items[newId].setPriceRight(item.priceRight)
        if (item.priceTitle) this.items[newId].setPriceTitle(item.priceTitle)
        if (item.data) this.items[newId].setData(item.data)
        if (item.preview) this.items[newId].setPreview(item.preview)
        if (item.index != undefined) { this.items[newId].setIndex(item.index) } else { this.items[newId].setIndex(this.items.length) }
        if (item.description) this.items[newId].setDescription(item.description)
        if (item.action) this.items[newId].setAction(item.action)
        if (item.data) this.items[newId].setData(item.data)
        if (item.prefix) this.items[newId].setPrefix(item.prefix)
        if (item.statistics) this.items[newId].setStatistics(item.statistics)
        if (item.translate != undefined) this.items[newId].setTranslate(item.translate)
        if (item.translateDescription != undefined) this.items[newId].setTranslateDescription(item.translateDescription)
        if (item.disabled != undefined) this.items[newId].setDisabled(item.disabled)
        if (item.visible != undefined) this.items[newId].setVisible(item.visible)
        if (item.iconClass) this.items[newId].setIconClass(item.iconClass)
        if (item.iconRight) this.items[newId].setIconRight(item.iconRight)
        if (item.grid) this.items[newId].setGrid(item.grid)
        if (item.textRight) this.items[newId].setTextRight(item.textRight)
        if (item.textRightClass) this.items[newId].setTextRightClass(item.textRightClass)
        if (item.translateTextRight != undefined) this.items[newId].setTranslateTextRight(item.translateTextRight)
        if (item.previewSlider != undefined) this.items[newId].setPreviewSlider(item.previewSlider)
        if (item.previewPalette != undefined) this.items[newId].setPreviewSlider(item.previewPalette)
      });
    }
    if (data.numberOnScreen) this.setNumberOnScreen(data.numberOnScreen)
    if (data.globalColor) this.setGlobalColor(data.globalColor)
    if (data.equipedColor) this.setEquipedColor(data.equipedColor)
    if (data.translateTitle != undefined) this.setTranslateTitle(data.translateTitle)
    if (data.subtitle != undefined) this.setSubtitle(data.subtitle)
    if (data.translateSubtitle != undefined) this.setTranslateSubtitle(data.translateSubtitle)
    if (data.type) this.setType(data.type)
    if (data.disableEscape != undefined) this.setDisableEscape(data.disableEscape)
    if (data.currentIndex != undefined) this.setCurrent(data.currentIndex - 1)
    this.refreshKey = Math.random();
  }

  setTitle(title) {
    this.title = title
  }

  setSubtitle(subtitle) {
    this.subtitle = subtitle
  }

  setType(value) {
    this.type = value
  }

  setCurrent(value) {
    this.currentIndex = value
  }

  setEquipedItem(value) {
    this.equipedItem = {
      index: value.index,
      variation: value.variation
    }
  }

  setNumberOnScreen(value) {
    this.numberOnScreen = value
  }

  setGlobalColor(value) {
    this.globalColor = value
  }

  setEquipedColor(value) {
    this.equipedColor = value
  }

  reset() {
    this.currentIndex = 0
    this.currentColor = 0
  }

  setTranslateTitle(value) {
    this.translateTitle = value
  }

  setTranslateSubtitle(value) {
    this.translateSubtitle = value
  }

  setDisableEscape(value) {
    this.disableEscape = value
  }
}

export const useMenuStore = defineStore('menus', {
  state: () => ({
    parentTree: [""],
    currentMenuId: '',
    menus: {},
  }),
  getters: {
    cMenu: (state) => state.menus[state.currentMenuId] || new Menu({}),
    cMenuItems() { return this.cMenu.items.filter(item => item.visible) },
    cItem() { return this.cMenuItems[this.cMenu.currentIndex] || {} },
    cItemPrice() {
      const cItem = this.cItem
      if (cItem.sliders) {
        for (let index = 0; index < cItem.sliders.length; index++) {
          const slider = cItem.sliders[index];
          const current = slider.current - 1
          if (slider.values[current] && typeof (slider.values[current]) == 'object' && (slider.values[current].price !== undefined))
            return slider.values[current].price
        }
      }
      return cItem.price || false
    },
  },
  actions: {
    resetMenu(data) {
      if (this.menus[data.menu])
        this.menus[data.menu].reset()
    },
    resetAllMenu() {
      for (const [key, value] of Object.entries(this.menus)) {
        value.reset()
      }
    },
    updateMenu(data) {
      let current = data.menu.currentIndex ? (data.menu.currentIndex - 1) : -1
      if (this.menus[data.menu.id] && data.menu.currentIndex == undefined) {
        current = this.menus[data.menu.id].currentIndex
      }
      this.menus[data.menu.id] = new Menu(data.menu)
      if (current >= this.menus[data.menu.id].items.length) {
        data.reset = true
      }
      if (current > -1) {
        this.menus[data.menu.id].setCurrent(current)
      }
      if (data.reset) {
        this.menus[data.menu.id].reset()
      }
      if (data.switch) {
        window.postMessage({
          event: "menuSwitch",
          reset: data.reset || false,
          menu: data.menu.id
        })
      }
    },
    removeMenu(data) {
      if (this.menus[data.menu] == undefined) return
      delete this.menus[data.menu]
    },
    updateMenuData(data) {
      if (!this.menus[data.menu]) return
      this.menus[data.menu] = API.deepMerge(this.menus[data.menu], data.data)
    },
    updateItem(data) {
      let Index = this.menus[data.menu].items.findIndex((item => item.index == data.index));
      if (Index == -1)
        return
      this.menus[data.menu].items[Index] = API.deepMerge(this.menus[data.menu].items[Index], data.item)
    },
    setMenuVisible(data) {
      for (var category in this.menus) {
        this.menus[category].items.forEach(item => {
          if (item.child == data.menu) {
            item.setVisible(data.visible)
          }
        })
      }
    },
    setCurrentIndex(menu, index) {
      if (this.menus[menu] == undefined) return
      this.menus[menu].setCurrent(index)
      if (menu == this.currentMenuId)
        this.updatePreview()
    },
    setCurrentMenu(data) {
      if (this.menus[data.menu] == undefined) return console.log("ERROR ! No menu : " + data.menu)
      if (data.reset) this.menus[data.menu].reset()
      if (data.keepHistoric) {
        if (this.parentTree.at(-1) != this.currentMenuId && this.currentMenuId.length > 0)
          this.parentTree.push(this.currentMenuId)
        // API.PlayAudio('button')
      } else {
        this.parentTree = []
      }
      this.currentMenuId = data.menu
      this.updatePreview()
    },
    menuEnter() {
      let item = this.cItem
      if (item.disabled) return
      API.PlayAudio('button')
      if (item.child) {
        this.parentTree.push(this.currentMenuId)
        this.currentMenuId = item.child
        this.updatePreview()
      } else {
        API.post('click', {
          menu: this.currentMenuId,
          item: this.cItem
        })
      }
    },
    menuBack() {
      API.post('backMenu', {
        menu: this.currentMenuId,
        item: this.cItem
      })
      if (this.parentTree.length > 0) {
        this.currentMenuId = this.parentTree.pop()
        API.PlayAudio('button')
        this.updatePreview()
      }
    },
    menuDown() {
      let menu = this.cMenu
      let items = this.cMenuItems
      if (menu.currentIndex < items.length - 1) {
        menu.currentIndex++;
      } else {
        menu.currentIndex = 0;
      }
      if (menu.items[menu.currentIndex].colors) {
        if (menu.items[menu.currentIndex].colors.current > menu.items[menu.currentIndex].colors.values.length - 1) {
          menu.items[menu.currentIndex].colors.current = 0
        }
      }
      API.PlayAudio('button')
      this.updatePreview()
    },
    menuUp() {
      let menu = this.cMenu
      let items = this.cMenuItems
      if (menu.currentIndex > 0) {
        menu.currentIndex--;
      } else {
        menu.currentIndex = items.length - 1
      }
      if (menu.items[menu.currentIndex].colors) {
        if (menu.items[menu.currentIndex].colors.current > menu.items[menu.currentIndex].colors.values.length - 1) {
          menu.items[menu.currentIndex].colors.current = 0
        }
      }
      API.PlayAudio('button')
      this.updatePreview()
    },
    sliderLeft(index) {
      if (this.cItem.disabled) return
      let item = this.cItem
      let slider = undefined
      if (index == undefined) {
        index = item.sliders.findIndex((slider) => { return slider.type == "switch" })
        slider = item.sliders[index] ? item.sliders[index] : item.sliders[0]
      } else {
        slider = item.sliders[index] ? item.sliders[index] : item.sliders[item.sliders.length - 1]
      }
      if (!slider) return;

      if (slider.type == "palette") {
        if (slider.current <= 0) return
        slider.current--;
      } else if (slider.type == "grid") {
        let values = slider.values
        if (values[0].current == values[0].min) return
        values[0].current -= (values[0].gap || 1)
        if (values[0].current < values[0].min)
          values[0].current = values[0].min
      } else {
        if (slider.current == 1 && !slider.looped) return
        slider.current--
        if (slider.current == 0) slider.current = slider.values.length
      }
      API.PlayAudio('button')
      this.updatePreview()
    },
    sliderRight(index) {
      if (this.cItem.disabled) return
      let item = this.cItem
      let slider = undefined
      if (index == undefined) {
        index = item.sliders.findIndex((slider) => { return slider.type == "switch" })
        slider = item.sliders[index] ? item.sliders[index] : item.sliders[0]
      } else {
        slider = item.sliders[index] ? item.sliders[index] : item.sliders[item.sliders.length - 1]
      }
      if (!slider) return;

      if (slider.type == "palette") {
        if (slider.current == slider.max) return
        slider.current++;
      } else if (slider.type == "grid") {
        let values = slider.values
        if (values[0].current == values[0].max) return
        values[0].current += (values[0].gap || 1)
        if (values[0].current > values[0].max)
          values[0].current = values[0].max
      } else {
        if (slider.current == slider.values.length && !slider.looped) return
        slider.current++;
        if (slider.current > slider.values.length) slider.current = 1
      }
      API.PlayAudio('button')
      this.updatePreview()
    },
    setSliderCurrent(data) {
      let item = this.cItem
      let slider = item.sliders[data.index]
      if (!slider) return;
      if (slider.type == "grid") {
        let values = slider.values
        let change = false
        if (slider.values.length == 2) {
          let current2 = data.value[1] * (values[1].max - values[1].min) + values[1].min
          current2 = Math.round(current2 / (values[1].gap || 1)) * (values[1].gap || 1)
          current2 = Math.min(Math.max(current2, values[1].min), values[1].max)
          if (current2 != values[1].current) {
            values[1].current = current2
            change = true
          }
        }
        let current = data.value[0] * (values[0].max - values[0].min) + values[0].min
        current = Math.round(current / (values[0].gap || 1)) * (values[0].gap || 1)
        current = Math.min(Math.max(current, values[0].min), values[0].max)
        if (current != values[0].current) {
          values[0].current = current
          change = true
        }
        if (!change) return
      } else {
        if (slider.current == data.value) return
        slider.current = data.value
      }
      API.PlayAudio('button')
      this.updatePreview()
    },
    saveGridPosition(data) {
      let item = this.cItem
      if (!item.grid) return
      let values = item.grid.values
      let change = false
      if (item.grid.values.length == 2) {
        let current2 = data[1] * (values[1].max - values[1].min) + values[1].min
        if (current2 != values[1].current) {
          values[1].current = current2
          change = true
        }
      }
      let current = data[0] * (values[0].max - values[0].min) + values[0].min
      if (current != values[0].current) {
        values[0].current = current
        change = true
      }
      if (change) {
        API.PlayAudio('button')
        this.updatePreview()
      }
    },
    gridLeft() {
      let item = this.cItem
      if (!item.grid) return
      let values = item.grid.values
      values[0].current -= (values[0].gap || 1)
      if (values[0].current < values[0].min)
        values[0].current = values[0].min
      API.PlayAudio('button')
      this.updatePreview()
    },
    gridRight() {
      let item = this.cItem
      if (!item.grid) return
      let values = item.grid.values
      values[0].current += (values[0].gap || 1)
      if (values[0].current > values[0].max)
        values[0].current = values[0].max
      API.PlayAudio('button')
      this.updatePreview()
    },
    gridUp() {
      let item = this.cItem
      if (!this.cItem.grid) return
      if (!(this.cItem.grid.values.length == 2)) return
      if (!item.grid) return
      if (!(item.grid.values.length == 2)) return
      let values = item.grid.values
      values[1].current -= (values[1].gap || 1)
      if (values[1].current < values[1].min)
        values[1].current = values[1].min
      API.PlayAudio('button')
      this.updatePreview()
    },
    gridDown() {
      let item = this.cItem
      if (!item.grid) return
      if (!(item.grid.values.length == 2)) return
      let values = item.grid.values
      values[1].current += (values[1].gap || 1)
      if (values[1].current > values[1].max)
        values[1].current = values[1].max
      API.PlayAudio('button')
      this.updatePreview()
    },
    updatePreview() {
      if (this.cItem == undefined) return
      let item = this.cItem
      API.post('updatePreview', {
        menu: this.currentMenuId,
        index: this.cMenu.currentIndex + 1,
        item: item,
      })
    },
  },
})
