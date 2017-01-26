import 'babel-polyfill';
import Vue from 'vue/dist/vue.js'

import store from '../src/stores/timetable.js'
import appointment from '../src/components/appointment.js'
import appointment_form from '../src/components/appointment_form.js'
import appointment_modal from '../src/components/appointment_modal.js'

describe('appointment', () => {
  const vm = new Vue({
    store,
    data: {
      appointment_panel_show: true 
    },
    components: {
      'appointment': appointment 
    }
  })
  it('can be loaded as a component', () => {
    expect(typeof vm).toBe('object')
  })

  it('has the correct amount of props', () => {
    expect(appointment.props).toEqual(['appointment', 'time_index', 'appointment_index', 'hidden', 'alignment'])
  })

  it('has an appointment_modal component loaded', () => {
    expect(appointment.components.appointment_modal).toEqual(appointment_modal)
  })
  it('has a computed attribute that calculates height', () => {
    expect(typeof appointment.computed.height).toBe('function')
  })
  it('has a computed attribute that calculates width', () => {
    expect(typeof appointment.computed.width).toBe('function')
  })
  it('has a computed attribute that calculates a modifier', () => {
    expect(typeof appointment.computed.modifier).toBe('function')
  })
})
