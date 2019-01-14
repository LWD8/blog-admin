export const actions = {
  nuxtServerInit ({ commit }, { req }) {
  },

  // 七牛token
  REQ_qiniuToken({commit, state}){
    return new Promise(async (resolve, reject) => {
      const res = await this.$axios.get('/qiniuToken')
      resolve(res)
    })
  },
  // 用户登录
  REQ_adminLogin({commit, state}, data){
    return new Promise(async (resolve, reject) => {
      const res = await this.$axios.post('/admin/login', data)
      resolve(res)
    })
  },
  // 增加文章
  REQ_addArticle({commit}, data) {
    return new Promise(async (resolve, reject) => {
      const res = await this.$axios.post('/admin/addarticle', data)
      resolve(res)
    })
  }
}
