import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    appointments: [
      { title: "Sprint retrospective", 
        start_time: "09:30",
        start_index: 0,
        end_time: "13:00",
        end_index: 0,
        description: "Lorem ipsum something something"
      },
      { title: "Poepen op de toilet", 
        start_time: "14:00", 
        start_index: 0,
        end_time: "17:00", 
        end_index: 0,
        description: "Lorem ipsum something something" 
      },
      { title: "Een buks kopen", 
        start_time: "14:00", 
        start_index: 0,
        end_time: "16:00", 
        end_index: 0,
        description: "Lorem ipsum something something" 
      }
    ]
  },
  mutations: {
    ADD_APPOINTMENT(state, new_appointment) {
      state.appointments.push(new_appointment)
    }
  },
  actions: {
    add_appointment({commit}, new_appointment) {
      commit('ADD_APPOINTMENT', new_appointment)
    }
  }
})

Vue.component('appointment', {
  props: ['appointment'],
  computed: {
    height() {
      let difference = Math.abs(this.appointment.start_index - this.appointment.end_index)
      console.log(`start: ${this.appointment.start_index}, end: ${this.appointment.end_index}, dif: ${difference}`)
      return `height: ${(difference * 25)}px;`
    }
  },
  template: `
    <div class='appointment' :style="height">
      <p class='appointment__title'>{{ appointment.title }}<span>{{appointment.start_time}}-{{appointment.end_time}}</span></p>
      <p class='appointment__description'>{{ appointment.description }}</p>
    </div>
  `
})

Vue.component('appointment-form', {
  methods: {
    add_appointment() {
      let push_this = Object.assign({}, this.new_appointment)
      store.dispatch('add_appointment', push_this)
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
      <label>title</label>
      <input v-model='new_appointment.title'> 
      <label>start time</label>
      <input v-model='new_appointment.start_time'> 
      <label>end time</label>
      <input v-model='new_appointment.end_time'> 
      <label>description</label>
      <input type='text' v-model='new_appointment.description'> 
      <button v-on:click='add_appointment'>jaja</button>
    </div>
  `
})

Vue.component('time-table__item', {
  props: ['time', 'index', 'appointments'],
  template: `
    <li class='time-table__item' v-bind:id='index'>
      <div class='hour'>
        <div class='hour__title' v-if='time.slice(-2) == "00"'>{{ time }}</div>
        <div class='hour__title' v-else></div>
        <div class='hour__line' v-if='time.slice(-2) == "00"'></div>
        <div class='hour__line hour__line--hidden' v-else></div>
        <appointment v-for='appointment in appointments' v-if='appointment.start_index == index' v-bind:appointment="appointment"></appointment> 
      </div>
    </li>
  `
});

new Vue({
  el: '#calendar',
  store,
  data: {
    timetable: [
      "00:00", "00:30", "01:00", "01:30",
      "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30",
      "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00",
      "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00",
      "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
    ]
  },
  computed: {
    appointments() {
      for (let appointment of store.state.appointments) {
        appointment.start_index = this.timetable.indexOf(appointment.start_time)
        appointment.end_index = this.timetable.indexOf(appointment.end_time)
      }
      return store.state.appointments
    }
  }
});
