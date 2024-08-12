import { useLangStore } from './stores/lang';
import { useDataStore } from './stores/datas';
import { useMenuStore } from './stores/menus';
var audio

/* eslint-disable camelcase */
class API {

  audioVolume = 0.5;

  constructor () {
    window.addEventListener('message', (event) => {
      const eventType = event.data.event
      if (eventType == undefined) return
      if (typeof this[eventType] === 'function') {
        this[eventType](event.data)
      } else {
        const menuStore = useMenuStore()
        if (typeof menuStore[eventType] === 'function') {
          menuStore[eventType](event.data)
        } else { 
          console.log("Error : this event doesn't exist: "+ event.data.event, event.data)
          console.log(event)
        }
      }
    })
  }

  async log (...data) {
    if (import.meta.env.DEV)
      return console.log(...data)
    return
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
          const fetchResponse = await fetch('https://' + GetParentResourceName() +'/'+ method, settings);
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

  updateShow(data) {
    const datas = useDataStore()
    datas.defineShow(data.show)
  }

  updateMenuPosition(data) {
    const datas = useDataStore()
    datas.definePosition(data.menuRight)
  }

  updateLang(data) {
    const langStore = useLangStore()
    langStore.updateStrings(data.lang)
  }

  startAudio(data) {
    this.PlayAudio(data.sound)
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

  PlayAudio = function (name) {
    var url = `./assets/sounds/${name}.mp3`
    
    if (name == "button" && audio && !audio.paused && audio.src == url) {
      if (audio.currentTime < 0.015) return
    }
    audio = new Audio(url); // path to file
    audio.volume = this.audioVolume
    audio.play();
  }

  deepMerge = function (obj1, obj2) {
    // Loop through the properties of the merged object
    for (const key of Object.keys(obj2)) {
      // Check if the property is an object
      if (typeof obj2[key] === 'object' && obj2[key] !== null) {
        // If the property is an object, recursively merge the objects
        if (obj1[key] == null) {
          obj1[key] = obj2[key]
        } else {
          obj1[key] = this.deepMerge(obj1[key], obj2[key]);
        }
      } else {
        obj1[key] = obj2[key]
      }
    }
    return obj1;
  }

  logProxy = function(...v) {
    console.log(JSON.parse(JSON.stringify(v)))
  }
}

const instance = new API()

export default instance