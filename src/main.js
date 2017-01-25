import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import store from './stores/timetable.js'
import timeInput from './components/time-input.js'

Vue.use(Vuex)

Vue.component('time-table__item', {
  props: ['time', 'index', 'appointments', 'alignment'],
  computed: {
    isHidden() {
      return this.time.slice(-2) == "00"     
    }
  },
  template: `
    <li class='time-table__item' :id='index'>
      <div class='hour'>
        <div class='hour__title' v-if='time.slice(-2) == "00"'>{{ time }}</div>
        <div class='hour__title' v-else></div>
        <div class='hour__line' :class="{ 'hour__line--hidden': !isHidden }">
          <appointment v-for='(appointment, i) in appointments' :appointment="appointment" :time_index=index :appointment_index='i' :alignment="alignment"></appointment> 
        </div>
      </div>
    </li>
  `
});

Vue.component('appointment', {
  props: ['appointment', 'time_index', 'appointment_index', 'hidden', 'alignment'],
  data() { return { show_modal: false } },
  methods: {
    toggle_modal() {
      this.show_modal = !this.show_modal 
    },
    next_appointment() {
      let all_appointments = this.$store.getters.all_appointments
    }
  },
  computed: {
    is_hidden() {
      console.log(typeof(this.hidden))
    },
    height() {
      // magic css height style for appointment divs
      let difference = Math.abs(this.appointment.start_index - this.appointment.end_index)
      return difference * 25
    },
    width() {
      let all_appointments = this.$store.getters.all_appointments
      let overlap_amount = 0
      for(let taken_appointments of all_appointments ) {
        for(let taken_appointment of taken_appointments) {
          let is_overlapping = taken_appointment.children_appointments.map((index)=> this.appointment.children_appointments.includes(index))
          console.log(is_overlapping)
          if(is_overlapping.some((t)=>t == true)) {
            is_overlapping = true
          } else is_overlapping = false
          console.log(is_overlapping)

          if(is_overlapping) {
            console.log("appointment: ")
            console.log(this.appointment.title)
            console.log()
            overlap_amount++
          }
        }
      }
      return overlap_amount
    },
    modifier() {
      return this.appointment.modifier + '%'
    }
  },
  template: `
    <transition name='appointment'>
      <div class='appointment' :style="{height: height, width: 100 / width + '%', float: alignment}" v-on:click='toggle_modal'>
        <p class='appointment-top'>
          <div class='appointment-top__title'>{{ appointment.title }}</div>
          <span class='appointment-top__time'>{{appointment.start_time}}-{{appointment.end_time}}</span>
        </p>
        <p class='appointment__description'>{{ appointment.description }}</p>
        <div class='modal-container' v-if="show_modal == true">
          <appointment-modal :appointment='appointment' :time_index='time_index' :appointment_index='appointment_index'></appointment-modal>
        </div>
      </div>
    </transition>
  `
})

Vue.component('appointment-modal', {
  props: ['appointment', 'time_index', 'appointment_index'],
  methods: {
    delete_appointment() {
      store.dispatch('delete_appointment', this.time_index, this.appointment_index)
    }
  },
  template: `
    <div class='appointment-modal'>
      <p class='appointment__title'>{{ appointment.title }}<span class='appointment__time cblack'>{{appointment.start_time}}-{{appointment.end_time}}</span></p>
      <p class='appointment__description cblack'>{{ appointment.description }}</p>
      <button class='button button--red' v-on:click='delete_appointment'>Delete</button>
    </div>
  `
})

Vue.component('appointment-form', {
  props: ['timetable'],
  methods: {
    children_appointments(start_time, end_time) {
      let times = [start_time]
      for(let i = start_time+1; i < end_time; i++) {
        times.push(i)
      }
      return times
    },
    add_appointment() {
      let appointment = Object.assign({}, this.new_appointment) // copy/clone appointment so it saves
      // compute some attributes for use in rendering
      //appointment.start_index = this.timetable.indexOf(appointment.start_time)
      appointment.start_index = this.timetable.map((t)=>t.time).indexOf(appointment.start_time)
      //appointment.end_index = this.timetable.indexOf(appointment.end_time)
      appointment.end_index = this.timetable.map((t)=>t.time).indexOf(appointment.end_time)
      appointment.children_appointments = this.children_appointments(appointment.start_index, appointment.end_index)

      store.dispatch('add_appointment', appointment)
    }
  },
  data(){
    return  {
      new_appointment: {
        title: "", 
        start_time: "00:00",
        end_time: "02:00",
        description: ""
      }
    }
  },
  template: `
    <div>
      <label class='appointment-panel__label' for='title'>Title</label>
      <input class='appointment-panel__input' v-model='new_appointment.title' id='title'> 
      <label class='appointment-panel__label' for='start'>Start time</label>
      <div class='calendar-icon'></div>
      <time-input v-model='new_appointment.start_time'></time-input>
      <label class='appointment-panel__label' for='end'>End time</label>
      <div class='calendar-icon'></div>
      <time-input v-model='new_appointment.end_time'></time-input>
      <label class='appointment-panel__label' for='description'>Description</label>
      <textarea class='appointment-panel__input appointment-panel__input--description' v-model='new_appointment.description' id='description'></textarea>
      <button class='button button--green' v-on:click='add_appointment'>Save</button>
    </div>
  `
})


new Vue({
  el: '#calendar',
  store,
  components: {timeInput},
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
