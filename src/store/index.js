import Vue from 'vue'
import Vuex from "vuex";

import Index from "./modules/index.js";

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        Index
    }
});

export default store;
