import Vue from "vue";
import swal from "sweetalert";
//import swal from 'sweetalert';

const state = {
    notes: [],
    collectionId: ''
};

const getters = {
    getNotes(state) {
        return state.notes;
    },
    getCollectionId(state) {
        return state.collectionId;
    }
};

const mutations = {
    clearNotes(state) {
        state.notes = [];
    },
};

const actions = {
    initNotes({getters, commit, state}) {
        if (getters.isAuthenticated) {
            Vue.axios.get(`${process.env.VUE_APP_FIREBASE_DB_URL}/collections/${getters.getCollectionId}.json`)
                .then((res) => {
                    commit('clearNotes');
                    for (let id in res.data.notes) {
                        res.data.notes[id].id = id;
                    }
                    state.notes = res.data.notes;
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
    queryNotes({getters, state, commit}, data) {
        if (getters.isAuthenticated) {
            if (Object.keys(getters.getCollections[data.id]).length > 0) {
                commit('clearNotes');
                Vue.axios.get(`${process.env.VUE_APP_FIREBASE_DB_URL}/collections/${data.id}.json`)
                    .then((res) => {
                        commit('clearNotes');
                        for (let id in res.data.notes) {
                            res.data.notes[id].id = id;
                        }
                        state.notes = res.data.notes;
                        state.collectionId = data.id;
                    })
                    .catch((err) => {
                        swal({
                            title: `${err}`,
                            text: "You clicked the button!",
                            icon: "error",
                        });
                    });
            }
        }
    },
    saveNote({getters, dispatch}, data) {
        if (getters.isAuthenticated) {
            Vue.axios.post(`${process.env.VUE_APP_FIREBASE_DB_URL}/collections/${getters.getCollectionId}/notes.json`, {
                title: data.title,
                longNote: data.longNote,
                priority: data.priority,
            })
                .then(() => {
                    dispatch("initNotes");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    deleteNote({dispatch, getters}, data) {
        console.log(data.id)
        return Vue.axios.delete(`${process.env.VUE_APP_FIREBASE_DB_URL}/collections/${getters.getCollectionId}/notes/${data.id}.json`)
            .then(() => {
                dispatch("initNotes");
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