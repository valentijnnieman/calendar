import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import timeInput from './components/time-input.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    appointments: []
  },
  mutations: {
    ADD_APPOINTMENT(state, new_appointment) {
      state.appointments.push(new_appointment)
    },
    DELETE_APPOINTMENT(state, index) {
      if(index != -1) {
        state.appointments.splice(index, 1)
      }
    },
    DEFAULT_APPOINTMENTS(state) {
      state.appointments = [ 
        { title: "Sprint retrospective", 
          start_time: "09:30",
          end_time: "10:30",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis imperdiet consectetur. Donec eget accumsan dui. Proin consequat augue"
        },
        { title: "All hands", 
          start_time: "14:00", 
          end_time: "15:00", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis imperdiet consectetur. Donec eget accumsan dui. Proin consequat augue" 
        },
        { title: "Database migration", 
          start_time: "13:00", 
          end_time: "16:00", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis imperdiet consectetur. Donec eget accumsan dui. Proin consequat augue facilisis ex placerat gravida." 
        }
      ]
    }
  },
  actions: {
    add_appointment({commit}, new_appointment) {
      commit('ADD_APPOINTMENT', new_appointment)
    },
    delete_appointment({commit}, index) {
      commit('DELETE_APPOINTMENT', index)
    }
  },
  plugins: [createPersistedState()]
})

if (window.localStorage.length < 1) {
  store.commit('DEFAULT_APPOINTMENTS')
}

Vue.component('appointment', {
  props: ['appointment', 'index'],
  data() { return { show_modal: false } },
  methods: {
    toggle_modal() {
      this.show_modal = !this.show_modal 
    }
  },
  computed: {
    height() {
      // magic css height style for appointment divs
      let difference = Math.abs(this.appointment.start_index - this.appointment.end_index)
      return difference * 25
    },
    width() {
      return this.appointment.width + '%'
    },
    modifier() {
      return this.appointment.modifier + '%'
    }
  },
  template: `
    <div class='appointment' :style="{height: height, width: width}" v-on:click='toggle_modal'>
      <p class='appointment__title'>{{ appointment.title }}<span class='appointment__time'>{{appointment.start_time}}-{{appointment.end_time}}</span></p>
      <p class='appointment__description'>{{ appointment.description }}</p>
      <div class='modal-container' v-if="show_modal == true">
        <appointment-modal v-bind:appointment='appointment' v-bind:index='index'></appointment-modal>
      </div>
    </div>
  `
})

Vue.component('appointment-modal', {
  props: ['appointment', 'index'],
  methods: {
    delete_appointment() {
      store.dispatch('delete_appointment', this.index)
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
  methods: {
    add_appointment() {
      let appointment = Object.assign({}, this.new_appointment) // copy/clone appointment so it saves
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
      <input type='reset' value='Cancel'></input>
    </div>
  `
})

Vue.component('time-table__item', {
  props: ['time', 'index', 'appointments'],
  computed: {
    isHidden() {
      return this.time.slice(-2) == "00"     
    }
  },
  template: `
    <li class='time-table__item' v-bind:id='index'>
      <div class='hour'>
        <div class='hour__title' v-if='time.slice(-2) == "00"'>{{ time }}</div>
        <div class='hour__title' v-else></div>
        <div class='hour__line' v-bind:class="{ 'hour__line--hidden': !isHidden }">
          <appointment v-for='(appointment, i) in appointments' v-if='appointment.start_index == index' v-bind:appointment="appointment" v-bind:index='i' ></appointment> 
        </div>
      </div>
    </li>
  `
});

new Vue({
  el: '#calendar',
  store,
  components: {timeInput},
  data: {
    timetable: [
      "00:00", "00:30", "01:00", "01:30",
      "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30",
      "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
      "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
      "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
    ]
  },
  methods: {
    filled_times(start_time, end_time) {
      let times = []
      for(let i = start_time; i <= end_time; i++) {
        times.push(i)
      }
      return times
    }
  },
  computed: {
    appointments() {
      let previous_appointments = []
      for (let appointment of store.state.appointments) {
        // get index of start and end times in timetable array
        appointment.width = 100 
        appointment.start_index = this.timetable.indexOf(appointment.start_time)
        appointment.end_index = this.timetable.indexOf(appointment.end_time)
        for(let previous of previous_appointments) {
          // 4 - 6 .... 5-7  
          let new_times = this.filled_times(appointment.start_index, appointment.end_index)
          let previous_times = this.filled_times(previous.start_index, previous.end_index)
          if(new_times.some(v => previous_times.includes(v))) {
            appointment.width = appointment.width / 2
            appointment.modifier = appointment.width
            previous.width = previous.width / 2 
          }
        }
        previous_appointments.push(appointment)
      }
      return store.state.appointments
    }
  }
});
