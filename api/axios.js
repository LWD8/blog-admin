import Vue from 'vue'
import Cookies from 'js-cookie'

var vm = new Vue({})

export default function ({ $axios, redirect, app, store }) {
  $axios.onRequest(config => {
    //获取cookie放在头部传到后端
    config.headers.Authorization = app.$cookies.get('access_token') || ''
    return config;
  })

  $axios.onResponse(response=>{
    const code = parseInt(response.data && response.data.code)
    if (code === 1100) {
      Cookies.remove('access_token')
      Cookies.remove('userInfo')
      redirect('/login')
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.code)
    if (code === 1100) {
      Cookies.remove('access_token')
      Cookies.remove('userInfo')
      redirect('/login')
    }
  })
}