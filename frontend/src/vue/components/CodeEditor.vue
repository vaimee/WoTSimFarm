<template>
     <div id="editor" class="fill-height"></div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as monaco from 'monaco-editor';
@Component
export default class CodeEditor extends Vue {
    mounted() {
        monaco.editor.create(document.getElementById("editor")!, {
	        value: '//WoT Code! Enjoy !!!!',
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
</style>