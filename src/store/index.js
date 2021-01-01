import Vue from "vue";
import Vuex from "vuex";
import swal from 'sweetalert';
import Collection from "@/store/modules/Collection";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: ""
    },
    mutations: {
        setToken(state, token){
            state.token = token;
        },
        clearToken(state){
            state.token = "";
        }
    },
    actions: {
        initAuth({commit}) {
            let token = localStorage.getItem("token");
            if (token) {
                commit("setToken", token);
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
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== "";
        },
        getUserEmail() {
            return localStorage.getItem('userEmail');
        }
    },
    modules: {
        Collection
    }
});

export default store;