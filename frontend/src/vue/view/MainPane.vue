<template>
    <v-container fluid fill-height pa-0>
        <splitpanes class="default-theme" style="height: 100%" id="page-container" @resized="log($event)">
            <pane v-if="codeEnabled">
                <div id="editor" class="fill-height"></div>
            </pane>
            <pane>
                <simulation-pane/>
            </pane>
        </splitpanes>
        
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SimulationPane from './SimulationPane.vue';
// @ts-ignore
import { Splitpanes, Pane } from 'splitpanes'; //!!!!! TODO FIX
import 'splitpanes/dist/splitpanes.css';
import * as monaco from 'monaco-editor';
@Component({
    components: { Splitpanes, Pane, SimulationPane }
})
export default class MainPane extends Vue {
    code : string = "" ;
    codeEnabled : boolean = true;
    public log(event : any) {
        console.log(event);
    }

    mounted() {
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
</style>