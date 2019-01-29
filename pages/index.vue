<template>
  <div>
    <Card v-show="articleData.length">
      <div slot="title">
        <Tag color="warning">
          <nuxt-link to="/addArticle">增加文章</nuxt-link>
        </Tag>
      </div>
      <Collapse v-model="collValue">
          <Panel :name="`${item.id}`" v-for="item in articleData" :key="item.id">
              {{item.title}}
              <Tag color="primary">
                <nuxt-link :to="{name:'addArticle', query: {id: item._id}}">编辑文章</nuxt-link>
              </Tag>
              <Tag color="error" @click.native="deleteArticle(item)">删除文章</Tag>
              <div slot="content" v-html="articContent(item.content)"></div>
          </Panel>
      </Collapse>
    </Card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import markdown from '~/plugins/marked'
export default {
  created () {
    this.getArticleList()
  },
  data () {
    return {
      collValue: '',
      articleForm: {
        page_size: 1000
      },
      articleData: []
    }
  },
  methods: {
    articContent(content) {
      return markdown(content, false, true).html
    },
    async deleteArticle(item) {
      let res = await this.REQ_deleteArticle(item._id)
      if (res.data.code !== 0) {
        this.$Message.success(res.data.msg)
        this.articleData.splice(this.articleData.findIndex(data => data._id === item._id), 1)
      }
    },
    async getArticleList() {
      let { data } = await this.REQ_articleList(this.articleForm)
      this.articleData = data.data.list || []
    },
    ...mapActions([
      'REQ_articleList',
      'REQ_deleteArticle'
    ])
  }
};
</script>

<style scoped>
</style>