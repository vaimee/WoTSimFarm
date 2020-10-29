import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

let servient = new Wot.Core.Servient({ clientOnly: true });
servient.addClientFactory(new Wot.Http.HttpClientFactory());

function configureServientLogging(): void {
    let createServientShutter = (logFunction: any) => {
        return (sender: any, ...args: any[]) => {
            if (!/^\[.*\]/.test(sender)) {
                logFunction(sender, ...args)
            }
        }
    }
    console.info = createServientShutter(console.info)
    console.debug = createServientShutter(console.debug)
    console.warn = createServientShutter(console.warn)
}

configureServientLogging();

export default new Vuex.Store({
    state: {
        code : "//WoT Code! Enjoy !!!!",
        codeEnabled : true,
        servient: servient
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
        },
        runCode(context) {
            context.state.servient.runScript(context.state.code)
        }
    },
    getters:{
        servient(state){
            return state.servient
        }
    }
});