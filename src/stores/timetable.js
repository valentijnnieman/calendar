import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

module.exports = new Vuex.Store({
  state: {
    appointments: [],
    timetable: [
      {time: "00:00", appointments: [], alignment: 'left'},
      {time: "00:30", appointments: [], alignment: 'left' },
      {time: "01:00", appointments: [], alignment: 'right' },
      {time: "01:30", appointments: [], alignment: 'right' },
      {time: "02:00", appointments: [], alignment: 'left' },
      {time: "02:30", appointments: [], alignment: 'left' },
      {time: "03:00", appointments: [], alignment: 'right' },
      {time: "03:30", appointments: [], alignment: 'right' },
      {time: "04:00", appointments: [], alignment: 'left' },
      {time: "04:30", appointments: [], alignment: 'left' },
      {time: "05:00", appointments: [], alignment: 'right' },
      {time: "05:30", appointments: [], alignment: 'right' },
      {time: "06:00", appointments: [], alignment: 'left' },
      {time: "06:30", appointments: [], alignment: 'left' },
      {time: "07:00", appointments: [], alignment: 'right' },
      {time: "07:30", appointments: [], alignment: 'right' },
      {time: "08:00", appointments: [], alignment: 'left' },
      {time: "08:30", appointments: [], alignment: 'left' },
      {time: "09:00", appointments: [], alignment: 'right' },
      {time: "09:30", appointments: [], alignment: 'right' },
      {time: "10:00", appointments: [], alignment: 'left' },
      {time: "10:30", appointments: [], alignment: 'left' },
      {time: "11:00", appointments: [], alignment: 'right' },
      {time: "11:30", appointments: [], alignment: 'right' },
      {time: "12:00", appointments: [], alignment: 'left' },
      {time: "12:30", appointments: [], alignment: 'left' },
      {time: "13:00", appointments: [], alignment: 'right' },
      {time: "13:30", appointments: [], alignment: 'right' },
      {time: "14:00", appointments: [], alignment: 'left' },
      {time: "14:30", appointments: [], alignment: 'left' },
      {time: "15:00", appointments: [], alignment: 'right' },
      {time: "15:30", appointments: [], alignment: 'right' },
      {time: "16:00", appointments: [], alignment: 'left' },
      {time: "16:30", appointments: [], alignment: 'left' },
      {time: "17:00", appointments: [], alignment: 'right' },
      {time: "17:30", appointments: [], alignment: 'right' },
      {time: "18:00", appointments: [], alignment: 'left' },
      {time: "18:30", appointments: [], alignment: 'left' },
      {time: "19:00", appointments: [], alignment: 'right' },
      {time: "19:30", appointments: [], alignment: 'right' },
      {time: "20:00", appointments: [], alignment: 'left' },
      {time: "20:30", appointments: [], alignment: 'left' },
      {time: "21:00", appointments: [], alignment: 'right' },
      {time: "21:30", appointments: [], alignment: 'right' },
      {time: "22:00", appointments: [], alignment: 'left' },
      {time: "22:30", appointments: [], alignment: 'left' },
      {time: "23:00", appointments: [], alignment: 'right' },
      {time: "23:30", appointments: [], alignment: 'right' },
    ]
  },
  mutations: {
    ADD_APPOINTMENT(state, new_appointment) {
      state.timetable[new_appointment.start_index].appointments.push(new_appointment)
    },
    DELETE_APPOINTMENT(state, time_index, appointment_index) {
      // TO-DO: fix this
      if(time_index != -1) {
        state.timetable[time_index].appointments.splice(appointment_index, 1)
      }
    }
  },
  actions: {
    add_appointment({commit}, new_appointment) {
      commit('ADD_APPOINTMENT', new_appointment)
    },
    default_appointments({commit}) {
      let new_appointments = [ 
        { title: "Sprint retrospective", 
          start_time: "09:30",
          start_index: 19,
          end_time: "10:30",
          end_index: 21,
          children_appointments: [19, 20, 21],
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis imperdiet consectetur. Donec eget accumsan dui. Proin consequat augue"
        },
        { title: "All hands", 
          start_time: "14:00", 
          start_index: 28,
          end_time: "15:00", 
          end_index: 30,
          children_appointments: [28, 29, 30],
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis imperdiet consectetur. Donec eget accumsan dui. Proin consequat augue" 
        },
        { title: "Database migration", 
          start_time: "13:00", 
          start_index: 26,
          end_time: "16:00", 
          end_index: 32,
          children_appointments: [26, 27, 28, 29, 30, 31, 32],
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis imperdiet consectetur. Donec eget accumsan dui. Proin consequat augue facilisis ex placerat gravida." 
        }
      ]
      for(let appointment of new_appointments) {
        commit('ADD_APPOINTMENT', appointment) 
      }
    },
    delete_appointment({commit}, time_index, appointment_index) {
      commit('DELETE_APPOINTMENT', time_index, appointment_index)
    }
  },
  getters: {
    all_appointments: state => {
      let all_appointments = []
      for(let time of state.timetable) {
        if(time.appointments.length > 0) {
          all_appointments.push(time.appointments)
        }
      }
      return all_appointments
    }
  },
  plugins: [createPersistedState()]
})

