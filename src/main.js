import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import store from './stores/timetable.js'
import appointment from './components/appointment.js'
import appointment_form from './components/appointment_form.js'
import appointment_modal from './components/appointment_modal.js'
import timetable_item from './components/timetable_item.js'

Vue.use(Vuex)

new Vue({
  el: '#calendar',
  store,
  components: {
    'appointment': appointment, 
    'appointment-form': appointment_form, 
    'appointment-modal': appointment_modal,
    'time-table__item': timetable_item},
  data: {
    appointment_panel_show: true 
  },
  computed: {
    timetable() {
      if(window.localStorage.length < 1) {
        console.log("default!")
        store.dispatch('default_appointments')
      }
      return store.state.timetable
    }
  }
});
