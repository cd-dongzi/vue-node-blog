<template>
    <section class="info-wrapper df-center">
        <div class="info-box">
            <div class="avatar"></div>
            <h2 class="name">Wintermelon</h2>
            <small class="desc">吃喝拉撒睡...</small>
        </div>
    </section>
</template>
<style lang="less" scoped>
    .bg-image-cover(@bgCover) {
        background: @vice-color;
        background-image: url(@bgCover);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .info-wrapper {
       .bg-image-cover('../../images/cover.jpg');
        width: 100%;
        height: 6rem;
        max-height: 400px;
        position: relative;
        text-align: center;

        .avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 2px solid rgba(186, 164, 119, 0.99);
            background: url("../../images/avatar.png") no-repeat center center;
            background-size: 100% 100%;
            margin: 0 auto;
            &:hover {
                animation: btnGroups 1s linear;
            }
        }
        .name {
            margin: 20px 0 10px 0;
        }
    }

</style>