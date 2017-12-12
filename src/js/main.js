import '../css/main.scss';
import Vue from 'vue';
import axios from 'axios';
import ProgressBar from 'progressbar.js';
import numeral from 'numeral';

var app = new Vue({
  el: "#app",
  data: {
    items: [],
    loaded: false,
    loading: true
  },
  methods: {
    refreshData: function () {
      var bar = new ProgressBar.Line("#loadingBar", {
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        from: {color: '#FFEA82'},
        to: {color: '#ED6A5A'},
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
        }
      });

      function barAnimate(){
        bar.animate(1.0);
      }

      var v = this;
      axios.get('https://api.coinmarketcap.com/v1/ticker/')
        .then(function (response) {
          console.log(response.data);
          v.items = response.data;

          barAnimate();
          console.log(v.loaded);
          console.log(v);
          v.loaded = true;
          v.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });

    },
    formatCurrency: function(num){
      if(parseFloat(num) < 5){
        return numeral(num).format('0[.]00000');
      }
      return numeral(num).format('0,0.00');
    }
  }
});

app.refreshData();


//navbar toggle
document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

//app.items = JSON.search(app.items, "//*[contains(symbol, 'BTC') or contains(symbol, 'ETC')]");
