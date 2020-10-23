<template>
     <div id="editor" class="fill-height"></div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import store from '../plugins/vuex';
import * as monaco from 'monaco-editor';
@Component
export default class CodeEditor extends Vue {
    mounted() {
        const editor = monaco.editor.create(document.getElementById("editor")!, {
	        value: '//WoT Code! Enjoy !!!!',
            language: 'typescript',
            theme: "vs",
            renderWhitespace: 'all',
            automaticLayout: true
        });

        editor.onDidChangeModelContent( (e:any) => {
            store.commit("updateCode",editor.getValue());
        })
    }
} 
</script>

<style scoped>
    #editor {
        text-align: left;
    }
</style>