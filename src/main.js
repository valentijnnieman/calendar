let Vue = require('vue/dist/vue.js')

class Test {
  constructor() {
    this.poop = 'poop';
  }
}

new Vue({
  el: '#calendar',
  data: {
    test: "I am Testor!"
  }
});
