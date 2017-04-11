import axios from "axios";

const module = {
    state: {
        baseData: []
    },
    mutations: {
        setData(state, data) {
            state.baseData = data;
        }
    },
    actions: {
        // 服务端渲染，预加载数据，必须要返回promise对象
        requestData({ state, commit, rootState }) {
            return axios.post("http://makerh5.com:1227/getInfo", {
                pubKey: "20170131"
            })
            .then((res) => {
                res = res.data;
                commit("setData", res);
                console.log(res);
            });
        }
    },
    getters: {
        baseData(state) {
            return state.baseData;
        }
    }
}

export default module;
