<template>
    <v-container fluid fill-height pa-0>
        <splitpanes class="default-theme" id="page-container" 
            @resize="splitPaneResized" 
            @pane-maximize="splitPaneBouncing"
            @pane-add="splitPaneBouncing"
            @pane-remove="splitPaneBouncing"
        >
            <pane v-if="codeEnabled" min-size="20">
                <code-editor/>
            </pane>
            <pane min-size="20">
                <simulation-pane ref="simulationPane"/>
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
import store from '../plugins/vuex';
@Component({
    components: { Splitpanes, Pane, SimulationPane, CodeEditor }
})
export default class MainPane extends Vue {
    simulationPane : SimulationPane | null = null
    mounted() {
        this.simulationPane = <SimulationPane> this.$refs["simulationPane"]
        window.addEventListener("resize", () => this.simulationPane!.resize()); 
    }

    get codeEnabled() : boolean {
        return store.state.codeEnabled
    } 

    splitPaneResized() {
        this.simulationPane!.resize()
    }

    splitPaneBouncing() {
        setTimeout(() => this.simulationPane!.resize(), 200)
    }
    
 }
</script>

<style scoped>
    #page-container {
        height: 100%
    }
</style>