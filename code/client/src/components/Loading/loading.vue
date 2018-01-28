<template>
    <div>
        <LoadingPc v-if="$store.getters.pc_bol"></LoadingPc>
        <LoadingPhone v-else></LoadingPhone>
    </div>
</template>
<script>
import LoadingPhone from './loading-3'
import LoadingPc from './loading-4'
export default{
    components: {
        LoadingPhone,
        LoadingPc
    }
}
</script>