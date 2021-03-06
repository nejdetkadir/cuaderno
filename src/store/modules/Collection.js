import Vue from "vue";
import swal from 'sweetalert';

const state = {
    collections: [],
};

const getters = {
    getCollections(state) {
        return state.collections;
    },
};

const mutations = {
    clearCollections(state) {
        state.collections = [];
    },
};

const actions = {
    initCollections({getters, commit}) {
        if (getters.isAuthenticated) {
            console.log('init col')
            Vue.axios.get(`${process.env.VUE_APP_FIREBASE_DB_URL}/collections.json`)
                .then((res) => {
                    commit("clearCollections");
                    let collectionData = {};
                    for (let id in res.data) {
                        if (res.data[id].userEmail === getters.getUserEmail) {
                            res.data[id].id = id;
                            collectionData[id] = res.data[id];
                            console.log(res.data[id].userEmail + ' ==  ' + getters.getUserEmail)
                        }
                    }
                    state.collections = collectionData;
                })
                .catch((err) => {
                    swal({
                        title: `${err}`,
                        text: "You clicked the button!",
                        icon: "error",
                    });
                });
        }
    },
    saveCollection({dispatch, getters}, data) {
        if (getters.isAuthenticated) {
            Vue.axios.post(`${process.env.VUE_APP_FIREBASE_DB_URL}/collections.json`, {
                userEmail: getters.getUserEmail,
                collectionName: data.collectionName
            })
                .then(() => {
                    dispatch("initCollections");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    deleteCollection({dispatch}, data) {
        Vue.axios.delete(`${process.env.VUE_APP_FIREBASE_DB_URL}/collections/${data.id}.json`)
            .then(() => {
                dispatch("initCollections");
                swal("Aww yiss!", "Deleted your tweet!", "success")
            })
            .catch(() => {
                swal("Error!", "There is a error!", "error");
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};