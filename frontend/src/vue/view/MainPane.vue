<template>
    <v-container fluid fill-height>
        <v-row id="page-container">
            <v-col cols="6" id="editor">
            </v-col>
            <v-col cols="6">
                <canvas id="renderCanvas"></canvas>
            </v-col>    
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as monaco from 'monaco-editor';
@Component
export default class MainPane extends Vue {
    code : string = "" 
    mounted() {
        console.log("here..")
        monaco.editor.create(document.getElementById("editor")!, {
	        value: ['//WoT Code! Enjoy !!!!'].join('\n'),
            language: 'typescript',
            theme: "vs-dark",
            renderWhitespace: 'all',
            automaticLayout: true
        });
    }
}
</script>

<style scoped>
    #editor {
        text-align: left;
    }   
    #renderCanvas {
        width: 100%;
        height: 100%;
        touch-action: none;
    }
</style>