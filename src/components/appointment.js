import appointment_modal from './appointment_modal.js'

export default {
  props: ['appointment', 'time_index', 'appointment_index', 'alignment'],
  data() { return { show_modal: false } },
  components: {
    'appointment_modal': appointment_modal
  },
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
      let all_appointments = this.$store.getters.all_appointments
      let overlap_amount = 0
      for(let taken_appointments of all_appointments ) {
        for(let taken_appointment of taken_appointments) {
          let is_overlapping = taken_appointment.children_appointments.map((index)=> this.appointment.children_appointments.includes(index))
          if(is_overlapping.some((t)=>t == true)) {
            is_overlapping = true
          } else is_overlapping = false

          if(is_overlapping) {
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
        <div class='appointment-top'>
          <div class='appointment-top__title'>{{ appointment.title }}</div>
          <div class='appointment-top__time'>{{appointment.start_time}}-{{appointment.end_time}}</div>
        </div>
        <p class='appointment__description'>{{ appointment.description }}</p>
        <div class='modal-container' v-if="show_modal == true">
          <appointment_modal :appointment='appointment' :time_index='time_index' :appointment_index='appointment_index'></appointment_modal>
        </div>
      </div>
    </transition>
  `
}
