import { defineStore } from 'pinia'
import API from './API'
import _, { get } from 'lodash'

class MenuItem {
  title = '';
  icon = false;
  iconRight = false;
  iconClass = '';
  child = false;
  sliders = false;
  colors = false;
  price = false;
  priceTitle = false;
  priceRight = false;
  data = {};
  preview = false;
  index = 0;
  visible = true;
  description = '';
  action = false;
  translate = true;
  translateDescription = true;
  data = false;
  prefix = false;
  statistics = [];
  disabled = false;
  grid = false;
  id = 0;
  textRight = false;
  translateTextRight = true;
  previewPalette = true;

  constructor(id) {
    this.id = id
  }

  setTitle(title) {
    this.title = title
  }

  setIcon(icon) {
    this.icon = icon
  }
  setSliders(sliders) {
    this.sliders = []

    sliders = Array.isArray(sliders)?sliders:[sliders]

    sliders.forEach(slid => {
      this.sliders.push({...{current:0,values:[], offset:0, translate: true,type:'slider', looped: true},...slid})
    })
  }
  setChild(value) {
    this.child = value
  }
  setColors(colors) {
    this.colors = {...{title:'', current:0,offset:0,values:[],displayRight:false,displayTick:true},...colors}
    if (this.colors.current >= 8) {
      this.colors.offset = this.colors.current - 8
      if (this.colors.offset < 0) this.colors.offset = 0
    }
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
  setStatistics(value) {
    for (var p in value) {
      this.statistics.push(Object.assign(new ItemStatistic(),value[p]))
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
  setTranslateTextRight(value) {
    this.translateTextRight = value
  }
  setPreviewPalette(value) {
    this.previewPalette = value
  }
}

class ItemStatistic {
  label = ""
  type = "bar"
  class = ""
  value = [0,0,10]
}

class Menu {
  title = "";
  type = "list";
  translateTitle = true;
  currentItem = 0;
  equipedItem = {
    index: -1,
    variation: -1
  };
  items = [];
  offset = 0;
  child = false;
  currentColor = 0;
  offsetColor = 0;
  helpers = false;
  numberOnScreen = 8;
  globalColor = false;
  equipedColor = 0;
  disableEscape = false;

  constructor(data) {
    this.setTitle(data.title);
    if (data.items) {
      data.items.forEach(item => {
        let newId = this.items.push(new MenuItem(this.items.length)) -1
        if (item.title)  this.items[newId].setTitle(item.title)
        if (item.icon)  this.items[newId].setIcon(item.icon)
        if (item.slider) this.items[newId].setSliders(item.slider)
        if (item.sliders) this.items[newId].setSliders(item.sliders)
        if (item.child) this.items[newId].setChild(item.child)
        if (item.colors) this.items[newId].setColors(item.colors)
        if (item.price !== false) this.items[newId].setPrice(item.price)
        if (item.priceRight !== false) this.items[newId].setPriceRight(item.priceRight)
        if (item.priceTitle) this.items[newId].setPriceTitle(item.priceTitle)
        if (item.data) this.items[newId].setData(item.data)
        if (item.preview) this.items[newId].setPreview(item.preview)
        if (item.index != undefined) {this.items[newId].setIndex(item.index)}else{this.items[newId].setIndex(this.items.length)}
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
        if (item.translateTextRight != undefined) this.items[newId].setTranslateTextRight(item.translateTextRight)
        if (item.previewPalette != undefined) this.items[newId].setPreviewPalette(item.previewPalette)
      });
    }
    if (data.numberOnScreen) this.setNumberOnScreen(data.numberOnScreen)
    if (data.globalColor) this.setGlobalColor(data.globalColor)
    if (data.equipedColor) this.setEquipedColor(data.equipedColor)
    if (data.translateTitle != undefined) this.setTranslateTitle(data.translateTitle)
    if (data.type) this.setType(data.type)
    if (data.disableEscape) this.setDisableEscape(data.disableEscape)
  }

  setTitle(title) {
    this.title = title
  }

  setType(value) {
    this.type = value
  }

  setCurrent(value) {
    this.currentItem = value
  }

  setHelpers(helpers) {
    this.helpers = []
    helpers.forEach(helper => {
      this.helpers.push(
        {keys: helper.keys, title: helper.title})
    })
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
    this.currentItem = 0
    this.offset = 0
    this.currentColor = 0
    this.offsetColor = 0
  }

  setTranslateTitle(value) {
    this.translateTitle = value
  }

  setDisableEscape(value) {
    this.disableEscape = value
  }
}

export const useMenuStore = defineStore('menus', {
  state: () => {
    return {
      parentTree: [],
      currentMenu : '',
      menus: {},
      globalPrices: [],
      boughtItems: [],
      displayOutfitId: false,
      refreshID: 0,
      refreshLastID: -1,
      menus: {},
    }
  },
  getters: {
    menu: ({ menus, currentMenu}) => menus[currentMenu],
    menuItems: (state, getters) => getters.menu.items.filter(item => item.visible),
    cItem: (state, getters) => getters.menuItems[getters.menu.currentItem],
    isItemBought: ({ boughtItems }, getters) => (hash)=> {
      if (hash == undefined) {
        let item = getters.cItem
        if (item == undefined) return false
        if (!item.slider) return false
        hash = item.sliders[0].values[item.sliders[0].current -1]
      }
      return boughtItems.filter(el => {return _.isEqual(el,hash)}).length > 0
    },
    globalPrice: (state) => {
      let globalPrice = state.globalPrices.find(globalPrice => globalPrice.menus.includes(state.currentMenu))
      return globalPrice || false
    },
    cItemPrice: (state, getters) => {
      const cItem = getters.cItem
      if (getters.isItemBought()) {
        return 0
      }
      if (cItem.sliders) {
        for (let index = 0; index < cItem.sliders.length; index++) {
          const slider = cItem.sliders[index];
          const current = slider.current -1
          if (slider.values[current] && typeof(slider.values[current]) == 'object' && (slider.values[current].price !== undefined))
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
    menuSwitch(data) {
      this.parentTree.push(this.currentMenu)
      if (data.reset) this.menus[data.menu].reset()
      this.currentMenu = data.menu
      API.PlayAudio('button')
      this.updatePreview()
    },
    updateMenu(data) {
      let current = -1
      let offset = -1
      if (this.menus[data.menu.id]) {
        current = this.menus[data.menu.id].currentItem
        offset = this.menus[data.menu.id].offset
      }
      this.menus[data.menu.id] = new Menu(data.menu)
      if (current >= this.menus[data.menu.id].items.length) {
        data.reset = true
      }
      if (current > -1) {
        this.menus[data.menu.id].offset = offset 
        this.menus[data.menu.id].setCurrent(current)
      }
      if (data.reset) {
        this.menus[data.menu.id].reset()
      }
      if (data.switch) {
        window.postMessage({
          event:"menuSwitch",
          reset:data.reset||false,
          menu:data.menu.id
        })
      }
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
    setCurrentItem(data) {
      this.menus[this.currentMenu].offset = data.offset
      this.menus[this.currentMenu].setCurrent(data.id)
      this.updatePreview()
    },
    setCurrentMenu(data) {
      this.currentMenu = data.menu
      this.parentTree = []
      this.refreshID ++
      this.updatePreview()
    },
    menuEnter({ getters }) {
      let item = getters.cItem
      if (item.disabled) return
      API.PlayAudio('button')
      if (item.child) {
        state.parentTree.push(state.currentMenu)
        state.currentMenu = item.child
        state.refreshID ++
        this.updatePreview()
      } else {
        API.post('select',{
          menu: this.getters.currentMenu,
          item: this.getters.cItem
        })
      }
    },
    menuBack({ getters }) {
      API.post('back',{
        menu: this.getters.currentMenu,
        item: getters.cItem
      })
      if (this.parentTree.length > 0) {
        this.currentMenu = this.parentTree.pop()
        API.PlayAudio('button')
        this.updatePreview()
      }
    },
    menuDown({ getters }) {
      let menu = getters.menu
      let items = getters.menuItems
      if (menu.currentItem < items.length -1) {
        menu.currentItem++;
      } else {
        menu.currentItem = 0;
      }
      if (menu.items[menu.currentItem].colors) {
        if (menu.items[menu.currentItem].colors.current > menu.items[menu.currentItem].colors.values.length -1) {
          menu.items[menu.currentItem].colors.current = 0
          menu.items[menu.currentItem].colors.offset = 0
        }
      }
      API.PlayAudio('button')
      this.updatePreview()
    },
    menuUp({getters}) {
      let menu = getters.menu
      let items = getters.menuItems
      if (menu.currentItem > 0) {
        menu.currentItem--;
      } else {
        menu.currentItem = items.length - 1
      }
      if (menu.items[menu.currentItem].colors) {
        if (menu.items[menu.currentItem].colors.current > menu.items[menu.currentItem].colors.values.length -1) {
          menu.items[menu.currentItem].colors.current = 0
          menu.items[menu.currentItem].colors.offset = 0
        }
      }
      API.PlayAudio('button')
      this.updatePreview()
    },
    sliderLeft({ getters },index) {
      if (getters.cItem.disabled) return
      let item = getters.cItem
      let slider = undefined
      if (index == undefined) {
        index = item.sliders.findIndex((slider) => { return slider.type == "switch" })
        slider = item.sliders[index]?item.sliders[index]:item.sliders[0]
      } else {
        slider = item.sliders[index]?item.sliders[index]:item.sliders[item.sliders.length-1]
      }
      if (!slider) return;
  
      if (slider.type == "slider" || slider.type == "switch") {
        if (slider.current == 1 && !slider.looped) return
        slider.current--
        if (slider.current == 0) slider.values.length
      } else if (slider.type == "palette") {
        if (slider.current <= 0) return
        slider.current--;
      } else if (slider.type == "grid") {
        let values = slider.values
        if (values[0].current == values[0].min) return
        values[0].current -= values[0].gap
        if (values[0].current < values[0].min)
          values[0].current = values[0].min
      }
      API.PlayAudio('button')
      this.updatePreview()
    },
    sliderRight({ getters },index) {
      if (getters.cItem.disabled) return
      let item = getters.cItem
      let slider = undefined
      if (index == undefined) {
        index = item.sliders.findIndex((slider) => { return slider.type == "switch" })
        slider = item.sliders[index]?item.sliders[index]:item.sliders[0]
      } else {
        slider = item.sliders[index]?item.sliders[index]:item.sliders[item.sliders.length-1]
      }
      if (!slider) return;
  
      if (slider.type == "slider" && slider.type == "switch") {
        if (slider.current == slider.values.length && !slider.looped) return
        slider.current++;
        if (slider.current > slider.values.length) slider.current = 1
      } else if (slider.type == "palette") {
        if (slider.current == slider.max) return
        slider.current++;
      } else if (slider.type == "grid") {
        let values = slider.values
        if (values[0].current == values[0].max) return
        values[0].current += values[0].gap
        if (values[0].current > values[0].max)
          values[0].current = values[0].max
      }
      API.PlayAudio('button')
      this.updatePreview()
    },
    setSliderCurrent({getters},data) {
      let item = getters.cItem
      let slider = item.sliders[data.index]
      if (!slider) return;
      if (slider.type == "grid") {
        let values = slider.values
        let change = false
        if (slider.values.length == 2) {
          let current2 = data.vIndex[1]*(values[1].max - values[1].min) + values[1].min
          if (current2 != values[1].current) {
            values[1].current = current2
            change = true
          }
        }
        let current = data.vIndex[0]*(values[0].max - values[0].min) + values[0].min
        if (current != values[0].current) {
          values[0].current = current
          change = true
        }
        if (!change) return
      } else {
        if (slider.current == data.vIndex) return
        slider.current = data.vIndex
      }
      API.PlayAudio('button')
      this.updatePreview()
    },
    saveGridPosition({getters}, data) {
      let item = getters.cItem
      if (!item.grid) return
      let values = item.grid.values
      let change = false
      if (item.grid.values.length == 2) {
        let current2 = data[1]*(values[1].max - values[1].min) + values[1].min
        if (current2 != values[1].current) {
          values[1].current = current2
          change = true
        }
      }
      let current = data[0]*(values[0].max - values[0].min) + values[0].min
      if (current != values[0].current) {
        values[0].current = current
        change = true
      }
      if (change) {
        API.PlayAudio('button')
      } 
      this.updatePreview()
    },
    gridLeft({getters}) {
      let item = getters.cItem
      if (!item.grid) return
      let values = item.grid.values
      values[0].current -= values[0].gap
      if (values[0].current < values[0].min)
        values[0].current = values[0].min
      API.PlayAudio('button')
      this.updatePreview()
    },
    gridRight({getters}) {
      let item = getters.cItem
      if (!item.grid) return
      let values = item.grid.values
      values[0].current += values[0].gap
      if (values[0].current > values[0].max)
        values[0].current = values[0].max
      API.PlayAudio('button')
      this.updatePreview()
    },
    gridUp({getters}) {
      let item = getters.cItem
      if (!getters.cItem.grid) return
      if (!(getters.cItem.grid.values.length == 2)) return
      if (!item.grid) return
      if (!(item.grid.values.length == 2)) return
      let values = item.grid.values
      values[1].current -= values[1].gap
      if (values[1].current < values[1].min)
        values[1].current = values[1].min
      API.PlayAudio('button')
      this.refreshID ++
      this.updatePreview()
    },
    gridDown({getters}) {
      let item = getters.cItem
      if (!item.grid) return
      if (!(item.grid.values.length == 2)) return
      let values = item.grid.values
      values[1].current += values[1].gap
      if (values[1].current > values[1].max)
        values[1].current = values[1].max
      API.PlayAudio('button')
      this.updatePreview()
    },
    updatePreview({ getters }) {
      if (getters.cItem == undefined) return
      let item = getters.cItem
      API.post('updatePreview',{
        menu: this.currentMenu,
        current: {id:getters.menu.currentItem, offset: getters.menu.offset},
        item: item,
      })
    },
  },
})
