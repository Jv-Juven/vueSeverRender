<template lang="html">
<div>
    <ul>
        <li v-for="item in baseData">
            {{item.phone}}
        </li>
    </ul>
</div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
    name: "index-view",
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            "baseData"
        ])
        // baseData() {
        //     return this.$store.getters.baseData;
        // }
    },
    mounted() {
        this.requestData();
    },
    // 服务端渲染，预加载数据，必须要返回promise对象
    // preFetch(store) {
    //     return store.dispatch("requestData");
    // },
    methods: {
        ...mapActions([
            "requestData"
        ])
    },
    components: {}
}
</script>

<style lang="stylus">
</style>
