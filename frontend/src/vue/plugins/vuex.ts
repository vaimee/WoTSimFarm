import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        code : "",
        codeEnabled : true
    },
  
    mutations: {
        updateCode(state, code : string) {
            state.code = code
        },
        toggleCode(state) {
            state.codeEnabled = !state.codeEnabled
        }
    },
    actions: {
        updateCode(context, code : string) {
            context.commit('updateCode', code);
        },
        toggleCode(context) {
            context.commit('toggleCode')
        }
    }
});