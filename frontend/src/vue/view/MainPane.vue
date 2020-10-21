<template>
    <v-container fluid fill-height pa-0>
        <splitpanes class="default-theme" style="height: 100%" id="page-container">
            <pane v-if="codeEnabled" min-size="20" size="30">
                <code-editor/>
            </pane>
            <pane min-size="20" size="70">
                <simulation-pane/>
            </pane>
        </splitpanes>
        
    </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SimulationPane from './SimulationPane.vue';
import CodeEditor from '../components/CodeEditor.vue'
// @ts-ignore
import { Splitpanes, Pane } from 'splitpanes'; //!!!!! TODO FIX
import 'splitpanes/dist/splitpanes.css';
import * as monaco from 'monaco-editor';
@Component({
    components: { Splitpanes, Pane, SimulationPane, CodeEditor }
})
export default class MainPane extends Vue {
    codeEnabled : boolean = true
 }
</script>