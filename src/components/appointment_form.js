import Vue from 'vue/dist/vue.js'
import store from '../stores/timetable.js'

export default{
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
}

Vue.component('time-input', {
  template: `
    <select class='appointment-panel__input appointment-panel__input--calendar' @input="$emit('input', $event.target.value)">
      <option value="00:00">00:00</option>
      <option value="00:30">00:30</option>
      <option value="01:00">01:00</option>
      <option value="01:30">01:30</option>
      <option value="02:00">02:00</option>
      <option value="02:30">02:30</option>
      <option value="03:00">03:00</option>
      <option value="03:30">03:30</option>
      <option value="04:00">04:00</option>
      <option value="04:30">04:30</option>
      <option value="05:00">05:00</option>
      <option value="05:30">05:30</option>
      <option value="06:00">06:00</option>
      <option value="06:30">06:30</option>
      <option value="07:00">07:00</option>
      <option value="07:30">07:30</option>
      <option value="08:00">08:00</option>
      <option value="08:30">08:30</option>
      <option value="09:00">09:00</option>
      <option value="09:30">09:30</option>
      <option value="10:00">10:00</option>
      <option value="10:30">10:30</option>
      <option value="11:00">11:00</option>
      <option value="11:30">11:30</option>
      <option value="12:00">12:00</option>
      <option value="12:30">12:30</option>
      <option value="13:00">13:00</option>
      <option value="13:30">13:30</option>
      <option value="14:00">14:00</option>
      <option value="14:30">14:30</option>
      <option value="15:00">15:00</option>
      <option value="15:30">15:30</option>
      <option value="16:00">16:00</option>
      <option value="16:30">16:30</option>
      <option value="17:00">17:00</option>
      <option value="17:30">17:30</option>
      <option value="18:00">18:00</option>
      <option value="18:30">18:30</option>
      <option value="19:00">19:00</option>
      <option value="19:30">19:30</option>
      <option value="20:00">20:00</option>
      <option value="20:30">20:30</option>
      <option value="21:00">21:00</option>
      <option value="21:30">21:30</option>
      <option value="22:00">22:00</option>
      <option value="22:30">22:30</option>
      <option value="23:00">23:00</option>
      <option value="23:30">23:30</option>
    </select>
  `
})
