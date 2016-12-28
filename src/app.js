/**
 * Created by galen on 2016/12/28.
 */

import Vue from 'vue';
import App from './components/App';
import { currency } from './currency';
import store from './store';

Vue.filter('currency', currency);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
