import Vue from "vue";
import swal from "sweetalert";
//import swal from 'sweetalert';

const state = {
    notes: [],
    todayNotes: [],
    collectionId: ''
};

const getters = {
    getNotes(state) {
        return state.notes;
    },
    getCollectionId(state) {
        return state.collectionId;
    },
    getToday(state) {
        return state.todayNotes;
    }
};

const mutations = {
    clearNotes(state) {
        state.notes = [];
    },
    clearToday(state) {
        state.todayNotes = [];
    }
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
                longNote: '',
                datepicker: '',
                priority: 'None',
            })
                .then(() => {
                    dispatch("initNotes");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    updateNoteDetails({getters, dispatch}, data) {
        return Vue.axios.patch(`${process.env.VUE_APP_FIREBASE_DB_URL}/collections/${getters.getCollectionId}/notes/${data.id}.json`, {
            longNote: data.longNote,
            datepicker: data.datepicker,
            priority: data.priority
        })
            .then(() => {
                dispatch("initNotes");
            })
            .catch(() => {
                swal("Error!", "There is a error!", "error");
            });
    },
    queryToday({getters, state, commit}) {
        if (getters.isAuthenticated) {
            commit('clearToday');
            let now = new Date();
            let today = now.getFullYear()+"-"+("0" + (now.getMonth() + 1)).slice(-2)+"-"+("0" + now.getDate()).slice(-2)
            let todayData = [];
            for (let i in getters.getCollections) {
                for (let j in getters.getCollections[i].notes) {
                    if (today === getters.getCollections[i].notes[j].datepicker) {
                        todayData.push(getters.getCollections[i].notes[j]);
                    }
                }
            }
            state.todayNotes = todayData;
        }
    },
    deleteNote({dispatch, getters}, data) {
        return Vue.axios.delete(`${process.env.VUE_APP_FIREBASE_DB_URL}/collections/${getters.getCollectionId}/notes/${data.id}.json`)
            .then(() => {
                dispatch("initNotes");
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