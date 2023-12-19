import { createStore } from 'vuex'
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
      this.sliders.push({...{current:0,values:[], offset:0, translate: true,type:'slider'},...slid})
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
}

class ItemStatistic {
  label = ""
  type = "bar"
  class = ""
  value = [0,0,10]
}

class globalPrice {
  id = ""
  menus = []
  price = {money:0,gold:0}
  title = "price"
  constructor(id,menus,price = {money:0,gold:0},title="price") {
    this.id = id
    this.menus = menus
    this.price = price
    this.title = title
  }
  setPrice(price = {money:0,gold:0}) {
    this.price = price
  }
  setMenus(menus = []) {
    this.menus = menus
  }
  setTitle(title="price") {
    this.title = title
  }

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
  equipedColor = 0

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
        if (item.index) {this.items[newId].setIndex(item.index)}else{this.items[newId].setIndex(this.items.length)}
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
      });
    }
    if (data.numberOnScreen) this.setNumberOnScreen(data.numberOnScreen)
    if (data.globalColor) this.setGlobalColor(data.globalColor)
    if (data.equipedColor) this.setEquipedColor(data.equipedColor)
    if (data.translateTitle != undefined) this.setTranslateTitle(data.translateTitle)
    if (data.type) this.setType(data.type)
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
}

var state = {
  show: false,
  isMale: false,
  parentTree: [],
  currentMenu : '',
  lang: {},
  menus: {},
  globalPrices: [],
  audios: {
    button:"button.mp3",
    coin:"coins.mp3",
    selected: "selected.mp3"
  },
  boughtItems: [],
  displayOutfitId: false,
  menuPositionRight: false,
}

state.lang = {
  bigTitle: 'Menu',
  headerTitle: 'Menu',
  color: 'Color',
  of: '%1 of %2',
  selection: "Selection",
  buy: "Buy",
  back: "Back",
  select: "Select",
  price: 'Price',
  devise: '$',
  number: 'Number %1',
  free: 'Free',
  variation: 'Variation',
}

state.menus = {
}

const getters = {
  show: ({ show }) => show,
  audios: ({ audios }) => audios,
  menuPositionRight: ({ menuPositionRight }) => menuPositionRight,
  menu: ({ menus, currentMenu}) => menus[currentMenu],
  menuItems: (state, getters) => {
    return getters.menu.items.filter(item => item.visible)
  },
  cItem: (state, getters) => getters.menuItems[getters.menu.currentItem],
  lang: ({ lang }) => (index) => {
    return lang[index]?lang[index]:('#'+index)
  },
  parentTree: ({ parentTree }) => parentTree,
  currentMenu: ({ currentMenu }) => currentMenu,
  audios: ({ audios }) => audios,
  isItemBought: ({ boughtItems }, getters) => (hash)=> {
    if (hash == undefined) {
      let item = getters.cItem
      if (item == undefined) return false
      if (!item.slider) return false
      hash = item.sliders[0].values[item.sliders[0].current -1]
    }
    return boughtItems.filter(el => {return _.isEqual(el,hash)}).length > 0
  },
  displayOutfitId: ({ displayOutfitId }) => displayOutfitId,
  globalPrice: (state) => {
    let globalPrice = state.globalPrices.find(globalPrice => globalPrice.menus.includes(state.currentMenu))
    return globalPrice || false
  }
}

const actions = {
  menuEnter({ commit, dispatch, getters }) {
    let item = getters.cItem
    if (item.disabled) return
    if (item.child) {
      commit('MENU_ENTER')
      dispatch('updatePreview')
    } else {
      commit('MENU_ENTER')
    }
  },
  menuBack({ commit, dispatch, state }) {
    commit('MENU_BACK')
    if (state.show)
      dispatch('updatePreview')
  },
  menuDown({ commit, dispatch }) {
    commit('MENU_DOWN')
    dispatch('updatePreview')
  },
  menuUp({ commit, dispatch }) {
    commit('MENU_UP')
    dispatch('updatePreview')
  },
  sliderLeft({ commit, dispatch,getters },index) {
    if (getters.cItem.disabled) return
    commit('SLIDER_LEFT',index)
    dispatch('updatePreview', true)
  },
  sliderRight({ commit, dispatch, getters },index) {
    if (getters.cItem.disabled) return
    commit('SLIDER_RIGHT',index)
    dispatch('updatePreview', true)
  },
  setSliderCurrent({ commit, dispatch}, data) {
    commit('SET_SLIDER_CURRENT', data)
    dispatch('updatePreview', true)
  },
  colorLeft({ commit, dispatch }) {
    commit('COLOR_LEFT')
    dispatch('updatePreview', true)
  },
  colorRight({ commit, dispatch }) {
    commit('COLOR_RIGHT')
    dispatch('updatePreview', true)
  },
  setColorCurrent({commit,dispatch},value) {
    commit('SET_COLOR_CURRENT', value)
    dispatch('updatePreview', true)
  },
  saveGridPosition({commit,dispatch, getters}, value) {
    if (!getters.cItem.grid) return
    commit('SAVE_GRID_POSITION',value)
    dispatch('updatePreview',true)
  },
  gridLeft({commit,dispatch,getters}) {
    if (!getters.cItem.grid) return
    commit('GRID_LEFT')
    dispatch('updatePreview',true)
  },
  gridRight({commit,dispatch, getters}) {
    if (!getters.cItem.grid) return
    commit('GRID_RIGHT')
    dispatch('updatePreview',true)
  },
  gridUp({commit,dispatch, getters}) {
    if (!getters.cItem.grid) return
    if (!(getters.cItem.grid.values.length == 2)) return
    commit('GRID_UP')
    dispatch('updatePreview',true)
  },
  gridDown({commit,dispatch, getters}) {
    if (!getters.cItem.grid) return
    if (!(getters.cItem.grid.values.length == 2)) return
    commit('GRID_DOWN')
    dispatch('updatePreview',true)
  },
  updatePreview({ state, getters }, force = false) {
    if (getters.cItem == undefined) return
    let item = getters.cItem
    if (item.preview || force)
    {
      if (item.sliders && item.sliders.length == 1) {
        if (item.sliders[0].type == "switch") {
          API.post('updatePreview',{
            menu: state.currentMenu,
            index: item.index,
            variation: item.sliders[0].current,
            current: {data: item.sliders[0].values[item.sliders[0].current -1],id:getters.menu.currentItem, offset: getters.menu.offset},
            data: item.data,
            item: getters.cItem,
          })
        } else {
          API.post('updatePreview',{
            menu: state.currentMenu,
            hash: item.sliders[0].values[item.sliders[0].current -1],
            index: item.index,
            variation: item.sliders[0].current,
            current: {id:getters.menu.currentItem, offset: getters.menu.offset},
            data: item.data,
            item: getters.cItem,
          })
        }
      } else if (item.colors) {
        API.post('updatePreview',{
          menu: state.currentMenu,
          hash: item.colors.values[item.colors.current].hash,
          index: item.index,
          variation: item.colors.current,
          current: {id:getters.menu.currentItem, offset: getters.menu.offset},
          data: item.data,
          item: getters.cItem,
        })
      } else {
        API.post('updatePreview',{
          menu: state.currentMenu,
          hash: 0,
          index: item.index,
          variation: 1,
          current: {id:getters.menu.currentItem, offset: getters.menu.offset},
          data: item.data,
          item: getters.cItem,
        })
      }
    } else {
      API.post('updatePreview',{
        menu: state.currentMenu,
        current: {id:getters.menu.currentItem, offset: getters.menu.offset},
        data: item.data,
        item: item,
      })
    }
  }
}

const mutations = {
  DEFINE_SHOW (state, value) {
    state.show = value
  },
  UPDATE_SEX (state, value) {
    state.isMale = value === 1
  },
  UPDATE_LANG (state, value) {
    state.lang = {...state.lang,...value}
  },
  UPDATE_MENU (state,data) {
    let current = -1
    let offset = -1
    if (state.menus[data.menu.id]) {
      current = state.menus[data.menu.id].currentItem
      offset = state.menus[data.menu.id].offset
    }
    state.menus[data.menu.id] = new Menu(data.menu)
    if (current > -1) {
      state.menus[data.menu.id].offset = offset 
      state.menus[data.menu.id].setCurrent(current)
    }
    if (data.reset) {
      state.menus[data.menu.id].reset()
    }
    if (state.currentMenu == data.menu.id) {
      this.dispatch('updatePreview')
    }
    if (data.switch) {
      window.postMessage({
        event:"menuSwitch",
        reset:data.reset||false,
        menu:data.menu.id
      })
    }
  },
  UPDATE_MENU_DATA(state, data) {
    if (!state.menus[data.menu]) return
    state.menus[data.menu] = API.deepMerge(state.menus[data.menu], data.data)
  },
  RESET_MENU (state, menu) {
    if (state.menus[menu]) {
      state.menus[menu].reset()
    }
  },
  MENU_DOWN (state) {
    let menu = this.getters.menu
    let items = this.getters.menuItems
    if (menu.currentItem < items.length -1) {
      menu.currentItem++;
    } else {
      menu.currentItem = 0;
    }
    API.PlayAudio(state.audios.button)
    
  },
  MENU_UP (state) {
    let menu = this.getters.menu
    let items = this.getters.menuItems
    if (menu.currentItem > 0) {
      menu.currentItem--;
    } else {
      menu.currentItem = items.length - 1
    }
    API.PlayAudio(state.audios.button)
  },
  MENU_ENTER (state) {
    let item = this.getters.cItem
    if (item.child) {
      state.parentTree.push(state.currentMenu)
      state.currentMenu = item.child
      API.PlayAudio(state.audios.button)
    } else {
      if (this.getters.cItem.action) {
        API.post('action',{
          menu: this.getters.currentMenu,
          item: this.getters.cItem
        })
      }
    }
  },
  MENU_SWITCH (state,data) {
    state.parentTree.push(state.currentMenu)
    if (data.reset) state.menus[data.menu].reset()
    state.currentMenu = data.menu
    API.PlayAudio(state.audios.button)
  },
  MENU_BACK (state) {
    if (state.parentTree.length == 0) {
      //quitter
      state.show = false
      API.post('close')
      return
    }
    state.currentMenu = state.parentTree.pop()
    API.PlayAudio(state.audios.button)
  },
  SLIDER_LEFT (state, index) {
    let item = this.getters.cItem
    let slider = undefined
    if (index == undefined) {
      index = item.sliders.findIndex((slider) => { return slider.type == "switch" })
      slider = item.sliders[index]?item.sliders[index]:item.sliders[0]
    } else {
      slider = item.sliders[index]?item.sliders[index]:item.sliders[item.sliders.length-1]
    }
    if (!slider) return;

    if (slider.type == "slider" && slider.current > 1) {
      slider.current--;
      API.PlayAudio(state.audios.button)
    }
    if (slider.type == "switch") {
      slider.current--;
      if (slider.current < 1) slider.current = slider.values.length
      API.PlayAudio(state.audios.button)
    }
    if (slider.type == "palette") {
      if (slider.current > 0) {
        slider.current--;
        API.PlayAudio(state.audios.button)
      }
    }
  },
  SLIDER_RIGHT (state, index) {
    let item = this.getters.cItem
    let slider = undefined
    if (index == undefined) {
      index = item.sliders.findIndex((slider) => { return slider.type == "switch" })
      slider = item.sliders[index]?item.sliders[index]:item.sliders[0]
    } else {
      slider = item.sliders[index]?item.sliders[index]:item.sliders[item.sliders.length-1]
    }
    if (!slider) return;

    if (slider.type == "slider" && slider.current < slider.values.length) {
      slider.current++;
      API.PlayAudio(state.audios.button)
    }
    if (slider.type == "switch") {
      slider.current++;
      if (slider.current > slider.values.length) slider.current = 1
      API.PlayAudio(state.audios.button)
    }
    if (slider.type == "palette") {
      if (slider.current < (slider.max)) {
        slider.current++;
        API.PlayAudio(state.audios.button)
      }
    }
  },
  SET_SLIDER_CURRENT (state,[index,vIndex]) {
    let item = this.getters.cItem
    let slider = item.sliders[index]
    if (!slider) return;
    if (slider.current == vIndex) return
    slider.current = vIndex
    API.PlayAudio(state.audios.button)
  },
  COLOR_LEFT (state) {
    let item = this.getters.cItem
    if (item.colors.current == 0) return
    item.colors.current--
    if (item.colors.current < item.colors.offset) {
      item.colors.offset--
    }
    
    let menu = this.getters.menu
    if (menu.globalColor) {
      menu.items.forEach(i => {
        if (i.colors) {
          i.colors.offset = item.colors.offset
          i.colors.current = item.colors.current
        }
      })
    }
    API.PlayAudio(state.audios.button)
  },
  COLOR_RIGHT (state) {
    let item = this.getters.cItem
    if (item.colors.current >= item.colors.values.length -1) return
    item.colors.current++;
    if (item.colors.current >= item.colors.offset + 9) {
      item.colors.offset++
    }

    let menu = this.getters.menu
    if (menu.globalColor) {
      menu.items.forEach(i => {
        if (i.colors) {
          i.colors.current = item.colors.current
          i.colors.offset = item.colors.offset
        }
      })
    }
    API.PlayAudio(state.audios.button)
  },
  SET_COLOR_CURRENT (state,value) {
    let item = this.getters.cItem
    item.colors.current = value
    let menu = this.getters.menu
    if (menu.globalColor) {
      menu.items.forEach(i => {
        if (i.colors) {
          i.colors.current = item.colors.current
          i.colors.offset = item.colors.offset
        }
      })
    }
    API.PlayAudio(state.audios.button)
  },
  SET_EQUIPED_ITEM (state, data) {
    if (!state.menus[data.id]) return;
    state.menus[data.id].setEquipedItem({
      index: data.index,
      variation: data.variation
    })
  },
  SET_EQUIPED_COLOR (state, data) {
    if (!state.menus[data.id]) return;
    state.menus[data.id].setEquipedColor(data.index-1)
  },
  SET_CURRENT_MENU (state, id) {
    state.currentMenu = id
    state.parentTree = []
  },
  SET_CURRENT_ITEM (state, data) {
    state.menus[state.currentMenu].offset = data.offset
    state.menus[state.currentMenu].setCurrent(data.id)
  },
  SET_BOUGHT_ITEM (state, data) {
    state.boughtItems.push(data)
  },
  REMOVE_BOUGHT_ITEM (state, data) {
    state.boughtItems = state.boughtItems.filter(el => {return !_.isEqual(el,data)})
  },
  UPDATE_BOUGHT_ITEMS (state, list) {
    state.boughtItems = list
  },
  SET_MENU_VISIBLE (state, data) {
    for (var category in state.menus) {
      state.menus[category].items.forEach(item => {
        if (item.child == data.menu) {
          item.setVisible(data.visible)
        }
      })
    }
  },
  DISPLAY_OUTFIT_ID(state, value) {
    state.displayOutfitId = value
  },
  MENU_POSITION_RIGHT(state,value) {
    state.menuPositionRight = value
  },
  UPDATE_HEADER(state,value) {
    state.lang.headerTitle = value
  },
  UPDATE_STATISTICS(state, data) {
    state.menus[data.menu].items[data.index].setStatistics(data.statistics)
  },
  UPDATE_ITEM_VISIBILITY(state,data) {
    if (state.menus[data.menu] == undefined) return 
    let Index = state.menus[data.menu].items.findIndex((item => item.index == data.index));
    if (Index == -1)
      return
    state.menus[data.menu].items[Index].setVisible(data.visible)
  },
  UPDATE_ITEM_DISABLED(state,data) {
    let Index = state.menus[data.menu].items.findIndex((item => item.index == data.index));
    if (Index == -1)
      return
    state.menus[data.menu].items[Index].setDisabled(data.disabled)
  },
  UPDATE_ITEM(state,data) {
    let Index = state.menus[data.menu].items.findIndex((item => item.index == data.index));
    if (Index == -1)
      return
    state.menus[data.menu].items[Index] = API.deepMerge(state.menus[data.menu].items[Index], data.item)
  },
  NEW_GLOBAL_PRICE(state,data) {
    let Index = state.globalPrices.findIndex((globalPrice => globalPrice.id == data.id))
    if (Index == -1) {
      state.globalPrices.push(new globalPrice(data.id,data.menus,data.price,data.title))
    } else {
      if (data.menus)
        state.globalPrices[Index].setMenus(data.menus)
      if (data.price != undefined)
        state.globalPrices[Index].setPrice(data.price)
      if (data.title)
        state.globalPrices[Index].setTitle(data.title)
    }
  },
  UPDATE_GLOBAL_PRICE(state,data) {
    let Index = state.globalPrices.findIndex((globalPrice => globalPrice.id == data.id))
    if (Index == -1) {
      return console.log('GLOBAL PRICE NOT SET')
    } else {
      if (data.menus)
        state.globalPrices[Index].setMenus(data.menus)
      if (data.price != undefined)
        state.globalPrices[Index].setPrice(data.price)
      if (data.title)
        state.globalPrices[Index].setTitle(data.title)
    }
  },
  SAVE_GRID_POSITION(state,data) {
    let item = this.getters.cItem
    if (!item.grid) return
    let values = item.grid.values
    if (item.grid.values.length == 2) {
      values[1].current = data[1]*(values[1].max - values[1].min) + values[1].min
    }
    values[0].current = data[0]*(values[0].max - values[0].min) + values[0].min
  },
  GRID_LEFT() {
    let item = this.getters.cItem
    if (!item.grid) return
    let values = item.grid.values
    values[0].current -= values[0].gap
    if (values[0].current < values[0].min)
      values[0].current = values[0].min
  },
  GRID_RIGHT() {
    let item = this.getters.cItem
    if (!item.grid) return
    let values = item.grid.values
    values[0].current += values[0].gap
    if (values[0].current > values[0].max)
      values[0].current = values[0].max
  },
  GRID_UP() {
    let item = this.getters.cItem
    if (!item.grid) return
    if (!(item.grid.values.length == 2)) return
    let values = item.grid.values
    values[1].current -= values[1].gap
    if (values[1].current < values[1].min)
      values[1].current = values[1].min
  },
  GRID_DOWN() {
    let item = this.getters.cItem
    if (!item.grid) return
    if (!(item.grid.values.length == 2)) return
    let values = item.grid.values
    values[1].current += values[1].gap
    if (values[1].current > values[1].max)
      values[1].current = values[1].max
  },
}


export default createStore({
  state,
  getters,
  actions,
  mutations
})

if (import.meta.env.DEV) {
  window.postMessage({
    event:'setCurrentMenu',
    id: 'home'
  })
  window.postMessage({
    event:'updateMenu',
    menu: {
      id: 'home',
      title: 'home',
      translateTitle: false,
      numberOnScreen : 8,
      globalColor: true,
      equipedColor: 1,
      items: [
        {
          title: 'Palette',
          disabled: false,
          colors : {
            displayTick: false,
            displayRight: true,
            current:0,
            values: [
              {custom: true, palette: 'tint_hair', tint0: 107, tint1:115, tint2: 158},
            ]
          }
        },
      ],
    }
  })
  window.postMessage({
    event:'updateMenu',
    menu: {
      id: 'categories',
      title: 'categories',
      numberOnScreen : 5,
      globalColor: true,
      equipedColor: 5,
      items: [],
    }
  })

  setTimeout(function() {
    window.postMessage({
      event:"show",
      show:true
    })
  },200)

}

