import Vue from "vue"
import app from "./app.vue"

let vm=new Vue({
    el:'#app',
    render:c=>c(app)
})