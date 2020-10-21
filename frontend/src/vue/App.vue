<template>
    <v-app>
        <splash-screen/>
        <v-app-bar app dense id="app-bar">
          <!-- todo move in another file-->
          <v-toolbar-title>WoT Farm</v-toolbar-title>
        </v-app-bar>
        <v-main id="main">
          <main-pane/>
        </v-main>
        <v-footer padless id="footer">
          <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} — <strong>cris.dev</strong>
          </v-col>
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

