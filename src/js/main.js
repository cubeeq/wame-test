// Import main.scss
import classes from '../scss/main.scss';

// Import Vue
import Vue from 'vue/dist/vue.min.js';
import VueMeta from 'vue-meta'

// Import additional
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import components
import App from './components/App.vue';
import ColorSelection from './components/ColorSelection.vue';
import StarRating from './components/StarRating.vue';
import MetaData from './components/MetaData.vue';

// Uses components
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('color-selection', ColorSelection);
Vue.component('star-rating', StarRating);
Vue.component('meta-data', MetaData);

// Uses additional
library.add(faStar);
Vue.use(VueMeta);

// Applying Vue & Redirection to App.vue ("src/js/components")
new Vue({
    el: '#app',
    render: h => h(App)
})