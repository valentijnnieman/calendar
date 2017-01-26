import appointment from './appointment.js'

export default{
  props: ['time', 'index', 'appointments', 'alignment'],
  components: {
    'appointment': appointment
  },
  computed: {
    is_hidden() {
      return this.time.slice(-2) == "00"     
    }
  },
  template: `
    <li class='time-table__item' :id='index'>
      <div class='hour'>
        <div class='hour__title' v-if='time.slice(-2) == "00"'>{{ time }}</div>
        <div class='hour__title' v-else></div>
        <div class='hour__line' :class="{ 'hour__line--hidden': !is_hidden }">
          <appointment v-for='(appointment, i) in appointments' :appointment="appointment" :time_index=index :appointment_index='i' :alignment="alignment"></appointment> 
        </div>
      </div>
    </li>
  `
}
