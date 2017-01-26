import store from '../stores/timetable.js'

export default{
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
}
