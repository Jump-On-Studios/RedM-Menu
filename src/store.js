import { createStore } from 'vuex'
import API from './API'

class MenuItem {
  title = '';
  icon = false;
  child = false;
  slider = false;
  colors = false;
  price = false;
  data = {};
  preview = false;
  index = 0;
  visible = true;
  description = '';
  action = false;
  translate = true;
  data = false;

  constructor() {}

  setTitle(title) {
    this.title = title
  }

  setIcon(icon) {
    this.icon = icon
  }
  setSlider({ title,current,values }) {
    this.slider = {
      title: title,
      current: current || 1,
      values: values || []
    }
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
  setData(data) {
    this.data = data
  }
}

class Menu {
  title = "";
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
    data.items.forEach(item => {
      let newId = this.items.push(new MenuItem()) -1
      if (item.title)  this.items[newId].setTitle(item.title)
      if (item.icon)  this.items[newId].setIcon(item.icon)
      if (item.slider) this.items[newId].setSlider(item.slider)
      if (item.child) this.items[newId].setChild(item.child)
      if (item.colors) this.items[newId].setColors(item.colors)
      if (item.price) this.items[newId].setPrice(item.price)
      if (item.data) this.items[newId].setData(item.data)
      if (item.preview) this.items[newId].setPreview(item.preview)
      if (item.index) {this.items[newId].setIndex(item.index)}else{this.items[newId].setIndex(this.items.length)}
      if (item.description) this.items[newId].setDescription(item.description)
      if (item.action) this.items[newId].setAction(item.action)
      if (item.data) this.items[newId].setData(item.data)
      if (item.translate != undefined) this.items[newId].setTranslate(item.translate)
    });
    if (data.numberOnScreen) this.setNumberOnScreen(data.numberOnScreen)
    if (data.globalColor) this.setGlobalColor(data.globalColor)
    if (data.equipedColor) this.setEquipedColor(data.equipedColor)
  }

  setTitle(title) {
    this.title = title
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
}

var state = {
  show: false,
  isMale: false,
  parentTree: [],
  currentMenu : '',
  lang: {},
  menus: {},
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
  variation: 'Variation'
}

state.menus = {
}

const getters = {
  show: ({ show }) => show,
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
      if (!item.slider) return false
      hash = item.slider.values[item.slider.current -1]
    }
    return boughtItems[String(hash)] !== undefined
  },
  displayOutfitId: ({ displayOutfitId }) => displayOutfitId
}

const actions = {
  menuEnter({ commit, dispatch, getters }) {
    let item = getters.cItem
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
  sliderLeft({ commit, dispatch }) {
    commit('SLIDER_LEFT')
    dispatch('updatePreview')
  },
  sliderRight({ commit, dispatch }) {
    commit('SLIDER_RIGHT')
    dispatch('updatePreview')
  },
  colorLeft({ commit, dispatch }) {
    commit('COLOR_LEFT')
    dispatch('updatePreview')
  },
  colorRight({ commit, dispatch }) {
    commit('COLOR_RIGHT')
    dispatch('updatePreview')
  },
  updatePreview({ state, getters }) {
    if (!getters.cItem) return
    if (getters.cItem.preview)
    {
      let item = getters.cItem
      if (item.slider) {
        API.post('updatePreview',{
          menu: state.currentMenu,
          hash: item.slider.values[item.slider.current -1],
          index: item.index,
          variation: item.slider.current,
          current: {id:getters.menu.currentItem, offset: getters.menu.offset},
          data: item.data,
          item: getters.cItem,
        })
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
          hash: item.slider.values[0],
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
    if (state.menus[data.id]) {
      current = state.menus[data.id].currentItem
      offset = state.menus[data.id].offset
    }
    state.menus[data.id] = new Menu(data)
    if (current > -1) {
      state.menus[data.id].offset = offset 
      state.menus[data.id].setCurrent(current)
    }
  },
  MENU_DOWN (state) {
    let menu = this.getters.menu
    let items = this.getters.menuItems
    if (menu.currentItem < items.length -1) {
      menu.currentItem++;
      API.PlayAudio(state.audios.button)
      let gap = 0
      for (let index = menu.offset; index < items.length; index++) {
        gap += (items[index].icon)?2:1
        if (gap > menu.numberOnScreen) {
          if (menu.currentItem >= index)
            menu.offset += menu.currentItem - index + 1;
          break
        }
      }
    } else {
      menu.currentItem = 0;
      menu.offset = 0
    }
    
  },
  MENU_UP (state) {
    let menu = this.getters.menu
    let items = this.getters.menuItems
    if (menu.currentItem > 0) {
      menu.currentItem--;
      if (menu.currentItem < menu.offset) {
        menu.offset--;
      }
      API.PlayAudio(state.audios.button)
    } else {
      menu.currentItem = items.length - 1
      let gap = 0
      for (let index = items.length-1; index > 0; index--) {
        gap += (items[index].icon)?2:1
        if (gap > menu.numberOnScreen) {
          if (menu.currentItem >= index) {
            menu.offset +=index+1;
          }
          break
        }
      }
      API.PlayAudio(state.audios.button)
    }
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
  MENU_SWITCH (state,name) {
    state.parentTree.push(state.currentMenu)
    state.currentMenu = name
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
    let slider = this.getters.cItem.slider
    if (!slider) return;

    if (slider.current > 1) {
      slider.current--;
      API.PlayAudio(state.audios.button)
    }
  },
  SLIDER_RIGHT (state) {
    let slider = this.getters.cItem.slider
    if (!slider) return;

    if (slider.current < slider.values.length) {
      slider.current++;
      API.PlayAudio(state.audios.button)
    }
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
  SET_BOUGHT_ITEM (state, hash) {
    state.boughtItems[String(hash)] = true;
  },
  REMOVE_BOUGHT_ITEM (state, hash) {
    delete state.boughtItems[String(hash)]
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
    event:'updateMenu',
    menu: {
      id: 'home',
      title: 'home',
      numberOnScreen : 12,
      globalColor: true,
      equipedColor: 5,
      items: [
        {
          title: 'bald', icon:"pants", child: 'categories',price: {money:5.0,gold:10},preview: true, colors: {
            title: 'Color',
            current: 1,
            offset: 0,
            values: [
              {texture: 'blonde', hash: 0},
              {texture: 'brown', hash: 1},
              {texture: 'DARKEST_BROWN', hash: 2},
              {texture: 'DARKEST_BROWN', hash: 3},
              {texture: 'DARKEST_BROWN', hash: 4},
              {texture: 'DARKEST_BROWN', hash: 5},
              {texture: 'DARKEST_BROWN', hash: 6},
              {texture: 'DARKEST_BROWN', hash: 7},
              {texture: 'DARKEST_BROWN', hash: 8},
              {texture: 'DARKEST_BROWN', hash: 9},
              {texture: 'DARKEST_BROWN', hash: 10},
              {texture: 'DARKEST_BROWN', hash: 11},
              {texture: 'DARKEST_BROWN', hash: 12},
              {texture: 'DARKEST_BROWN', hash: 13},
              {texture: 'DARKEST_BROWN', hash: 14},
            ]
          }
        },
        {
          title: 'bald2', icon:"pants", child: 'categories', preview: true, price: 5.0
        },
      ],
    }
  })
  window.postMessage({
    event:'updateMenu',
    menu: {
      id: 'categories',
      title: 'categories',
      numberOnScreen : 12,
      globalColor: true,
      equipedColor: 5,
      items: [],
    }
  })
  window.postMessage({
    event:'setCurrentMenu',
    id: 'home'
  })
  setTimeout(function() {
    window.postMessage({
      event:"show",
      show:true
    })
  },200)
  setTimeout(function() {
    window.postMessage({
      event:"updateHeader",
      title:"test"
    })
  },2000)
  window.postMessage({
    event:'setCurrentMenu',
    id: 'categories'
  })
}

