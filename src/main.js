let Vue = require('vue/dist/vue.js')

class Test {
  constructor() {
    this.poop = 'poop';
  }
}

Vue.component('list', {
  template: `
    <h1>I am a list!</h1>
  `
});

new Vue({
  el: '#calendar',
  data: {
    test: "I am Testor!"
  },
  components: {
    list: 'list'
  }
});
