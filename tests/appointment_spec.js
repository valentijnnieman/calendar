import 'babel-polyfill';
import Vue from 'vue/dist/vue.js'

import store from '../src/stores/timetable.js'
import appointment from '../src/components/appointment.js'
import appointment_form from '../src/components/appointment_form.js'
import appointment_modal from '../src/components/appointment_modal.js'

//const test = new Vue({
  //el: '#calendar',
  //store,
  //components: {appointment, appointment_form, appointment_modal},
  //data: {
    //appointment_panel_show: true 
  //},
  //computed: {
    //timetable() {
      //if(window.localStorage.length < 1) {
        //console.log("default!")
        //store.dispatch('default_appointments')
      //}
      //return store.state.timetable
    //}
  //}
//});

describe('appointment', () => {
  it('has the correct props passed down', () => {
    console.log(appointment.data)
  })
})
