<template>
     <div id="editor" class="fill-height"></div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import store from '../plugins/vuex';
//import nodeWoTDef from '!!raw-loader!../../monaco/node-wot'
import * as monaco from 'monaco-editor';
@Component
export default class CodeEditor extends Vue {
    created() {
        const nodeWoTLib =  require('!!raw-loader!../../monaco/node-wot.d.ts').default
        const WoTLib = require('!!raw-loader!../../monaco/wot.d.ts').default
        monaco.languages.typescript.javascriptDefaults.addExtraLib(nodeWoTLib, 'ts:filename/node-wot.d.ts');
        monaco.languages.typescript.javascriptDefaults.addExtraLib(WoTLib, 'ts:filename/wot.d.ts');
        monaco.editor.createModel(nodeWoTLib, 'typescript', monaco.Uri.parse('ts:filename/node-wot.d.ts'));
        monaco.editor.createModel(WoTLib, 'typescript', monaco.Uri.parse('ts:filename/wot.d.ts'));
    }
    mounted() {
        const editor = monaco.editor.create(document.getElementById("editor")!, {
	        value: store.state.code,
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