import Vue from 'vue'
import $ from 'jquery'

export default {
  mountLocalStorage: function (vue, key) {
    if (localStorage.getItem(key)) {
      try {
        vue[key] = localStorage.getItem(key);
      } catch(e) {
        localStorage.removeItem(key);
      }
    }
  },
  persistLocalStorage: function (vue, key) {
    localStorage[key] = vue[key];
  },
  init: function (id, component) {
    $('body').append(`<div id="${id}"></div>`)
    
    new Vue({
      el: `#${id}`,
      render: h => h(component),
    })
  }
}