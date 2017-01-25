import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'

import timetable_store from '../src/stores/timetable.js'

describe (timetable_store, () => {
  it('returns an array of objects', () => {
    expect(typeof timetable_store.state.timetable).toBe('array')
  })
})
