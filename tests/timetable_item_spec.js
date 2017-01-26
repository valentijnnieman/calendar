import Vue from 'vue/dist/vue.js'
import timetable_item from '../src/components/timetable_item.js'
import appointment from '../src/components/appointment.js'
describe('timetable_item', () => {
  const vm = new Vue({
    data: {
      appointment_panel_show: true 
    },
    components: {
      'time-table__item': timetable_item
    }
  })
  it('can be loaded as a component', () => {
    expect(typeof vm).toBe('object')
  })

  it('has the correct amount of props', () => {
    expect(timetable_item.props).toEqual(['time', 'index', 'appointments', 'alignment'])
  })

  it('has an appointment component loaded', () => {
    expect(timetable_item.components.appointment).toEqual(appointment)
  })

  it('has a method that decides if it should be hidden or not', () => {
    expect(typeof timetable_item.computed.isHidden).toBe('function')
  })
})

