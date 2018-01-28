<!-- PCloading -->
<template>
    <div class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
    </div>
</template>
<style lang="less" scoped>
    .spinner {
        margin: 0 auto;
        width: 90px;
        height: 90px;
        position: relative;
        text-align: center;
        animation: rotate 2.0s infinite linear;
    }

    .dot1,
    .dot2 {
        width: 60%;
        height: 60%;
        display: inline-block;
        position: absolute;
        top: 0;
        background-color: @theme-color;
        border-radius: 100%;
        animation: bounce 2.0s infinite ease-in-out;
    }

    .dot2 {
        top: auto;
        bottom: 0px;
        animation-delay: -1.0s;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes bounce {
        0%,
        100% {
            transform: scale(0.0);
        }
        50% {
            transform: scale(1.0);
        }
    }
</style>