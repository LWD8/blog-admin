

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
  },

  // 七牛token
  REQ_qiniuToken({commit, state}){
    return new Promise(async (resolve, reject) => {
      const res = await this.$axios.get('/qiniuToken').catch(error => {
        reject(error)
      })
      resolve(res)
    })
  },
  // 用户登录
  REQ_adminLogin({commit, state}, data){
    return new Promise(async (resolve, reject) => {
      const res = await this.$axios.post('/admin/login', data).catch(error => {
        reject(error)
      })
      resolve(res)
    })
  },
  // 增加文章
  REQ_addArticle({commit}, data) {
    return new Promise(async (resolve, reject) => {
      const res = await this.$axios.post('/admin/addarticle', data).catch(error => {
        reject(error)
      })
      resolve(res)
    })
  },
  // 文章列表
  REQ_articleList({commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/article/list', {
        params
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 文章详情
  REQ_articleDetail({commit}, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/article/details', {
        params: {
          id
        }
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 删除文章
  REQ_deleteArticle({commit}, id) {
    return new Promise(async (resolve, reject) => {
      const res = await this.$axios.delete('/article/delete', {
        data:{
          id
        }
      }).catch(error => {
        reject(error)
      })
      resolve(res)
    })
  },
}
