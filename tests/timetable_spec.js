import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'

import store from '../src/stores/timetable.js'

describe('store', () => {
  const vm = new Vue({
    store,
    data: {
      appointment_panel_show: true 
    },
    computed: {
      timetable() {
        return store.state.timetable
      }
    }
  })

  it('returns a timetable object containing an object for each applicable time (currently 48)', () => {
    expect(vm.timetable.length).toBe(48)
  })

  it('each object holds a time, appointments, and an alignment property', () => {
    for(let item of vm.timetable) { 
      expect(typeof item.time).toBe("string")
      expect(typeof item.appointments).toBe("object")
      expect(typeof item.alignment).toBe("string")
    }
  })
})

