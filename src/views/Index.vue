<template lang="html">
<div>首页</div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {}
    },
    computed: {},
    mounted() {
        axios.get("http://platenogroup.com")
            .then((res) => {
                console.log(res);
            });
    },
    methods: {},
    components: {}
}
</script>

<style lang="stylus">
</style>
