import Vue from "vue";
import Vuex from "vuex";
import swal from 'sweetalert';
import Collection from "@/store/modules/Collection";
import Notes from "@/store/modules/Notes";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: "",
        userEmail: ''
    },
    mutations: {
        setToken(state, token){
            state.token = token;
        },
        setUserEmail(state, userEmail) {
            state.userEmail = userEmail;
        },
        clearToken(state){
            state.token = "";
        }
    },
    actions: {
        initAuth({commit, dispatch}) {
            let token = localStorage.getItem("token");
            if (token) {
                commit("setToken", token);
                dispatch('initCollections');
            }

        },
        login({commit}, authData) {
            const url = authData.isUser ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}` : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;
            return Vue.axios.post(url, {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }).then((res) => {
                commit("setToken", res.data.idToken);
                commit("setUserEmail", authData.email);
                localStorage.setItem("token", res.data.idToken);
                localStorage.setItem("userEmail", authData.email);
                swal({
                    title: `${res}`,
                    text: "You clicked the button!",
                    icon: "success",
                });
            }).catch((err) => {
                swal({
                    title: `${err}`,
                    text: "You clicked the button!",
                    icon: "error",
                });
            });
        },
        logout({commit}) {
            commit("clearToken");
            commit("clearToday");
            commit('clearCollections')
            commit('clearNotes');
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== "";
        },
        getUserEmail(state) {
            return state.userEmail;
        }
    },
    modules: {
        Collection,
        Notes
    }
});

export default store;