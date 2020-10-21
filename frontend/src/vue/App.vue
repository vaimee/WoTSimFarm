<template>
    <v-app>
        <splash-screen/>
        <v-app-bar app dense flat id="app-bar">
          <!-- todo move in another file-->
          <v-toolbar-title>WoT Farm</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn small icon fab>
            <v-icon color="green">mdi-play</v-icon>
          </v-btn>
          <v-btn small icon fab>
            <v-icon color="red">mdi-pause</v-icon>
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
              <v-btn icon>
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
  @Component({
    components: { SplashScreen, MainPane }
  })
  export default class extends Vue { 
}
</script>

<style scoped>
  #main {
    height: 0;
  }
</style>