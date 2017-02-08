import store from '../stores/timetable.js'

export default{
  props: ['appointment', 'time_index', 'appointment_index'],
  methods: {
    delete_appointment() {
      store.dispatch('delete_appointment', this.time_index, this.appointment_index)
    }
  },
  template: `
    <transition name='appointment-modal'>
      <div class='appointment-modal'>
          <div class='appointment-top mb-10'>
            <div class='appointment-top__title cblack'>{{ appointment.title }}</div>
            <div class='appointment-top__time cblack'>{{appointment.start_time}}-{{appointment.end_time}}</div>
          </div>
          <p class='appointment__description appointment__description--modal cblack'>{{ appointment.description }}</p>
        <button class='button button--red' v-on:click='delete_appointment'>Delete</button>
      </div>
    </transition>
  `
}
