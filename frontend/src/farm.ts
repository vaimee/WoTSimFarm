
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, Mesh, MeshBuilder, SceneLoader, ParticleHelper, ParticleSystem, Texture, ConeParticleEmitter, PointParticleEmitter, GPUParticleSystem, TransformNode } from 'babylonjs';
import {OBJFileLoader} from 'babylonjs-loaders';
import loadSimulation from "./simulation";
import SkyMaterial from './materials/skymaterial';
import { lightFragment } from 'babylonjs/Shaders/ShadersInclude/lightFragment';
import { WoTLoadingScreen } from './loading';
import Vue from "vue";
import App from './vue/App' //todo solve this error
import vuetify from './vue/plugins/vuetify'
import store from './vue/plugins/vuex'

document.onkeypress = function (e) {
    e = e || window.event;
    // use e.keyCode
    if(e.key === "s"){
        const w = document.querySelector("#w");
        const o = document.querySelector("#oLetter");
        const t = document.querySelector("#t");
        w?.classList.toggle("pop")
        o?.classList.toggle("pop")
        t?.classList.toggle("pop")
    }
    if (e.key === "l") {
        const right = document.querySelector("#right");
        const left = document.querySelector("#left"); 
        right?.classList.toggle("slideRight")
        left?.classList.toggle("slideLeft")
    }

    if (e.key === "e") {
        const right = document.querySelector("#right");
        const left = document.querySelector("#left");
        const o = document.querySelector("#oLetter");
        o?.classList.add("full")
        o?.classList.remove("pop","letter")
        right?.addEventListener("animationiteration",()=>{
            right?.classList.toggle("endRight")
            o?.classList.toggle("spin")
        },{once:true});
        left?.addEventListener("animationiteration",()=>{
            left?.classList.toggle("endLeft")
        },{once:true});
    }
};
//vue initialization
new Vue({
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app');
