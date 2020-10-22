<template>
    <v-app>
        <splash-screen/>
        <v-app-bar app dense flat id="app-bar">
          <!-- todo move in another file-->
          <img src="assets/logo.svg" style="height : 50%">
          <v-toolbar-title style="margin-left: 10px">Farm Simulation</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn small icon fab>
            <v-icon color="#005a9c">mdi-play</v-icon>
          </v-btn>
          <v-btn small icon fab>
            <v-icon color="#b3b3b3">mdi-pause</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-main id="main">
          <main-pane/>
        </v-main>
        <v-footer dense padless id="footer">
          <v-card class="flex" flat tile>
            <v-card-title class="pa-1">
              <v-spacer></v-spacer>
              <v-btn icon @click="onClick()">
                <v-icon size="24px">mdi-code-array</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SplashScreen from './components/SplashScreen.vue';
  import MainPane from './view/MainPane.vue';
  import store from './plugins/vuex';
  @Component({
    components: { SplashScreen, MainPane }
  })
  export default class extends Vue { 
    public onClick() {
      console.log("clicked")
      store.dispatch("toggleCode") 
    }
  }
</script>

<style scoped>
  #main {
    height: 0;
  }
</style>