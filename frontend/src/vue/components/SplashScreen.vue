<template>
    <div id="splash">
        <div id="logo">
            <div class="letterContainer">
                <img id="w" class="letter" src="/assets/ui/w.png" alt="">
            </div>
            <div id="o" class="letterContainer" style="position: relative;">
                <img id="oLetter" class="letter" src="/assets/ui/o.png" style="animation-delay: 0.22s;" alt="">
                <img id="left" class="line" src="/assets/ui/line.png" alt="">
                <img id="right" class="line" src="/assets/ui/line.png" alt="">
            </div>
            <div class="letterContainer">
                <img id="t" class="letter" src="/assets/ui/t.png" style="animation-delay: 0.44s;" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
    #splash {
        position: absolute;
        background: white;
        left: 0;
        display: flex;
        z-index: 100;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
</style>