import { createStore } from 'vuex'
import API from './API'
import _ from 'lodash'

class MenuItem {
  title = '';
  icon = false;
  iconRight = false;
  iconClass = '';
  child = false;
  slider = false;
  sliderType = "slider"
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
  id = 0;

  constructor(id) {
    this.id = id
  }

  setTitle(title) {
    this.title = title
  }

  setIcon(icon) {
    this.icon = icon
  }
  setSlider(slider) {
    this.slider = {...{current:0,values:[], offset:0},...slider}
  }
  setChild(value) {
    this.child = value
  }
  setColors({ title,current,offset,values }) {
    this.colors = {
      title: title,
      current: current || 0,
      offset: offset || 0,
      values: values || []
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
  setSliderType(value) {
    this.sliderType = value
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
        if (item.slider) this.items[newId].setSlider(item.slider)
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
        if (item.sliderType) this.items[newId].setSliderType(item.sliderType)
        if (item.iconClass) this.items[newId].setIconClass(item.iconClass)
        if (item.iconRight) this.items[newId].setIconRight(item.iconRight)
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
  boughtItems: {},
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
      hash = item.slider.values[item.slider.current -1]
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
  sliderLeft({ commit, dispatch,getters }) {
    if (getters.cItem.disabled) return
    commit('SLIDER_LEFT')
    dispatch('updatePreview', true)
  },
  sliderRight({ commit, dispatch, getters }) {
    if (getters.cItem.disabled) return
    commit('SLIDER_RIGHT')
    dispatch('updatePreview', true)
  },
  setSliderCurrent({ commit, dispatch}, value) {
    commit('SET_SLIDER_CURRENT', value)
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
  updatePreview({ state, getters }, force = false) {
    if (getters.cItem == undefined) return
    let item = getters.cItem
    if (item.preview || force)
    {
      if (item.slider) {
        if (item.sliderType == "switch") {
          API.post('updatePreview',{
            menu: state.currentMenu,
            index: item.index,
            variation: item.slider.current,
            current: {data: item.slider.values[item.slider.current -1],id:getters.menu.currentItem, offset: getters.menu.offset},
            data: item.data,
            item: getters.cItem,
          })
        } else {
          API.post('updatePreview',{
            menu: state.currentMenu,
            hash: item.slider.values[item.slider.current -1],
            index: item.index,
            variation: item.slider.current,
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
        item: getters.cItem,
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
  SLIDER_LEFT (state) {
    let item = this.getters.cItem
    let slider = item.slider
    if (!slider) return;

    if (item.sliderType == "slider" && slider.current > 1) {
      slider.current--;
      API.PlayAudio(state.audios.button)
    }
    if (item.sliderType == "switch") {
      slider.current--;
      if (slider.current < 1) slider.current = slider.values.length
      API.PlayAudio(state.audios.button)
    }
    if (item.sliderType == "palette") {
      if (slider.current > 0) {
        slider.current--;
        API.PlayAudio(state.audios.button)
      }
    }
  },
  SLIDER_RIGHT (state) {
    let item = this.getters.cItem
    let slider = item.slider
    if (!slider) return;

    if (item.sliderType == "slider" && slider.current < slider.values.length) {
      slider.current++;
      API.PlayAudio(state.audios.button)
    }
    if (item.sliderType == "switch") {
      slider.current++;
      if (slider.current > slider.values.length) slider.current = 1
      API.PlayAudio(state.audios.button)
    }
    if (item.sliderType == "palette") {
      if (slider.current < (item.slider.max)) {
        slider.current++;
        API.PlayAudio(state.audios.button)
      }
    }
  },
  SET_SLIDER_CURRENT (state,value) {
    let item = this.getters.cItem
    let slider = item.slider
    if (!slider) return;
    if (slider.current == value) return
    slider.current = value
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
  }
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
          title: 'Bald',
          prefix:"lock",
          iconClass:'fred',
          //icon:'pants',
          title: 'Bald good',
          index: 'first',
          priceRight: 10,
          preview: true,
          colors: {
            title: "Color",
            current: 0,
            offset: 0,
            values: [
              {texture:'BLONDE',hash:'BLONDE'},
              {texture:'BLONDE',hash:'BLONDE'},
              {texture:'BLONDE',hash:'BLONDE'},
              {texture:'BLONDE',hash:'BLONDE'},
              {texture:'BLONDE',hash:'BLONDE'},
              {texture:'BLONDE',hash:'BLONDE'}
            ]
          }
        },
        {
          title: 'Bald',
          prefix:"lock",
          iconClass:'fred',
          icon:'pants',
          title: 'Bald good',
          index: 'first',
          priceRight: 10,
          preview: true,
          colors: {
            title: "Color",
            current: 0,
            offset: 0,
            values: [
              {texture:'BLONDE',hash:'BLONDE'},
              {texture:'BLONDE',hash:'BLONDE'},
              {texture:'BLONDE',hash:'BLONDE'},
              {texture:'BLONDE',hash:'BLONDE'},
              {texture:'BLONDE',hash:'BLONDE'},
              {texture:'BLONDE',hash:'BLONDE'}
            ]
          }
        },
        {
          title: 'Bald25',
          prefix:"star",
          //icon:"pants",
          iconClass:'fred',
          title: 'Bald good',
          prefix:"star",
          index: 'first',
          priceRight: {money:5.0,gold:10},
          price: 0,
          preview: true,
          slider: {
            title: 'Color',
            current: 1,
            values: [
              123,15635,54984
            ]
          }
        },
        {
          title: 'Bald',
          prefix:"star",
          icon:"pants",
          iconClass:'fred',
          title: 'Bald good',
          prefix:"star",
          index: 'first',
          preview: true,
          sliderType: 'colorBox',
          slider: {
            title: 'Color',
            current: 1,
            values: [
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
            ]
          }
        },
        {
          title: 'Bald',
          prefix:"star",
          icon:"pants",
          iconClass:'fred',
          title: 'Bald good',
          prefix:"star",
          index: 'first',
          preview: true,
          sliderType: 'colorBox',
          slider: {
            title: 'Color',
            current: 1,
            values: [
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
            ]
          }
        },
        {
          title: 'Bald',
          prefix:"star",
          icon:"pants",
          iconClass:'fred',
          title: 'Bald good',
          prefix:"star",
          index: 'first',
          preview: true,
          sliderType: 'colorBox',
          slider: {
            title: 'Color',
            current: 1,
            values: [
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
            ]
          }
        },
        {
          title: 'Bald',
          prefix:"star",
          icon:"pants",
          iconClass:'fred',
          title: 'Bald good',
          prefix:"star",
          index: 'first',
          preview: true,
          sliderType: 'colorBox',
          slider: {
            title: 'Color',
            current: 1,
            values: [
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
            ]
          }
        },
        {
          title: 'Bald',
          prefix:"star",
          icon:"pants",
          iconClass:'fred',
          title: 'Bald good',
          prefix:"star",
          index: 'first',
          preview: true,
          sliderType: 'colorBox',
          slider: {
            title: 'Color',
            current: 1,
            values: [
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
              {texture:'brown',hash:'brown'},
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

  window.postMessage({
		event: "updateBoughtItems",
		list: {
      123: true
    }
  })
  setTimeout(function() {
    window.postMessage({
      event:"show",
      show:true
    })
  },200)

  setTimeout(function() {
    window.postMessage({
      event:"newGlobalPrice",
      data:{
        id: "home",
        menus: ['home'],
        price: 5,
        title: "totalPrice"
      }
    })
  },200)

  setTimeout(function() {
    window.postMessage({
      event:"updateGlobalPrice",
      data:{
        id: "home",
        price: 15
      }
    })
  },2000)

}

