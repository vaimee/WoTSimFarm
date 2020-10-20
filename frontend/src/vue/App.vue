<template>
    <v-app>
        <splash-screen/>
        <v-main>
          <main-pane/>
        </v-main>
    </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SplashScreen from './components/SplashScreen.vue';
  import MainPane from './view/MainPane.vue';
  @Component({
    components: { SplashScreen, MainPane }
  })
  export default class extends Vue { }
</script>