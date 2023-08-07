import store from '@/store'

var BASE_URL = 'https://kd_menu/'
var audio

/* eslint-disable camelcase */
class API {

  audioVolume = 0.5;

  constructor () {
    window.addEventListener('message', (event) => {
      const eventType = event.data.event
      if (eventType !== undefined && typeof this[eventType] === 'function') {
        this[eventType](event.data)
      } else if (event.data.show !== undefined) {
        store.commit('DEFINE_SHOW', event.data.show)
      } else if (event.data.resourceName !== undefined) {
        BASE_URL = 'https://'+event.data.resourceName+"/"
      } else {
        console.log("Error : this event doesn't exist: "+ event.data.event, event.data)
        console.log(event)
      }
    })
  }

  async post (method, data) {
    this.log(method,data)
    if (import.meta.env.PROD) {
      const ndata = data === undefined ? '{}' : JSON.stringify(data)
      const settings = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: ndata
      };
      try {
          const fetchResponse = await fetch(BASE_URL + method, settings);
          const data = await fetchResponse.json();
          if (data.length == 0 || data === "ok") {
            return true
          }
          return JSON.parse(data);
      } catch (e) {
          this.log(e)
          return e;
      }
    }
    return ''
  }

  updateSex(data) {
    store.commit('UPDATE_SEX', data.sex)
  }

  updateMenu(data) {
    store.commit('UPDATE_MENU', data.menu)
  }

  updateMenuData(data) {
    store.commit('UPDATE_MENU_DATA', data)
  }

  resetMenu(data) {
    store.commit('RESET_MENU', data.menu)
  }

  menuSwitch(data) {
    store.commit('MENU_SWITCH', data.menu)
    store.dispatch('updatePreview')
  }

  forceBack() {
    store.dispatch('menuBack')
  }

  forceUpdatePreview() {
    store.dispatch('updatePreview')
  }

  updateLang(data) {
    store.commit('UPDATE_LANG', data.lang)
  }

  setEquipedItem(data) {
    store.commit('SET_EQUIPED_ITEM',data.data)
  }
  
  setEquipedColor(data) {
    store.commit('SET_EQUIPED_COLOR', data.data)
  }

  setCurrentMenu(data) {
    store.commit('SET_CURRENT_MENU',data.id)
  }

  setCurrentItem(data) {
    store.commit('SET_CURRENT_ITEM', data)
    store.dispatch('updatePreview')
  }

  setBoughtItem(data) {
    store.commit('SET_BOUGHT_ITEM', data.hash)
  }

  removeBoughtItem(data) {
    store.commit('REMOVE_BOUGHT_ITEM', data.hash)
  }

  updateBoughtItems(data) {
    store.commit('UPDATE_BOUGHT_ITEMS', data.list)
  }

  updateItem(data) {
    store.commit('UPDATE_ITEM', data)
  }

  updateItemVisibility(data) {
    store.commit('UPDATE_ITEM_VISIBILITY', data)
  }

  updateItemDisabled(data) {
    store.commit('UPDATE_ITEM_DISABLED', data)
  }

  startAudio(data) {
    this.PlayAudio(data.sound+".mp3")
  }

  setMenuVisible(data) {
    store.commit('SET_MENU_VISIBLE', { visible: data.visible, menu: data.menu })
    store.dispatch('updatePreview')
  }

  async log (...data) {
    if (import.meta.env.DEV)
      return console.log(...data)
    return
  }

  sprintf = function(...strings) {
    var result = strings[0];
    for (var i = 1; i < strings.length; i++) {
      var regexp = new RegExp('%'+i, 'gi');
      result = result.replace(regexp, strings[i]);
    }
    return result;
  }

  updateVolume(data) {
    this.audioVolume = data.volume
  }

  updateHeader(data) {
    store.commit('UPDATE_HEADER', data.title)
  }

  updateMenuPositionRight(data) {
    store.commit('MENU_POSITION_RIGHT',data.isRight)
  }

  displayOutfitId(data) {
    store.commit('DISPLAY_OUTFIT_ID', data.value)
  }

  updatestatistics(data) {
    store.commit('UPDATE_STATISTICS', {menu: data.menu, index: data.index, statistics: data.statistics})
  }


  
  PlayAudio = function (name) {
    var link = ""
    if (import.meta.env.DEV) {
      link = `./assets/sounds/${name}`
    } else {
      link = `./${name}`
    }
    var url = new URL(link, import.meta.url).href;
    
    if (name == "button.mp3" && audio && !audio.paused && audio.src == url) {
      if (audio.currentTime < 0.015) return
    }
    audio = new Audio(url); // path to file
    audio.volume = this.audioVolume
    audio.play();
  }

  deepMerge = function (obj1, obj2) {
    // Create a new object that combines the properties of both input objects
    const merged = {
      ...obj1,
      ...obj2
    };
    // Loop through the properties of the merged object
    for (const key of Object.keys(merged)) {
      // Check if the property is an object
      if (typeof merged[key] === 'object' && merged[key] !== null) {
        // If the property is an object, recursively merge the objects
        if (obj1[key] == null) {
          merged[key] = obj2[key]
        } else if (obj2[key] == null) {
          merged[key] = obj1[key]
        } else {
          merged[key] = this.deepMerge(obj1[key], obj2[key]);
        }
      }
    }
    return merged;
  }
}

const instance = new API()

export default instance
