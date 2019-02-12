<template>
    <div>
      <h1>文章管理</h1>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" class="from_box" style="width: 1000px;margin:0 auto;">
          <FormItem label="标题ID" prop="id">
              <Input v-model="formValidate.id" placeholder="标题"></Input>
          </FormItem>
          <FormItem label="标题" prop="title">
              <Input v-model="formValidate.title" placeholder="标题"></Input>
          </FormItem>
          <FormItem label="封面图">
              <upload-box :maxSize="200000"
                          :uploadFormat="['jpg','jpeg','png']"
                          :qiniuTonken="qdata.token || ''"
                          :location="qdata.domain || ''"
                          @uploadSuccess="getLoadPath"
                          >
                  <div class="uploadbox" ref="avatar">
                      <div class="iconbox">
                        <Icon type="camera" size="28"></Icon>
                      </div>
                      <FormItem prop="thumb">
                        <img class="image" :src="formValidate.thumb + '?imageView2/1/w/90/h/90/q/75%7Cimageslim'" alt=""/>
                      </FormItem>
                  </div>
              </upload-box>
          </FormItem>
          <FormItem label="关键字" prop="keyword">
              <Input v-model="formValidate.keyword" placeholder="搜索关键字"></Input>
          </FormItem>
          <FormItem label="评论(/人)" prop="comments">
              <Input v-model="formValidate.comments" disabled placeholder="评论数"></Input>
          </FormItem>
          <FormItem label="文章喜欢(/人)" prop="likes">
              <Input v-model="formValidate.likes" placeholder="文章喜欢"></Input>
          </FormItem>
          <FormItem label="阅读量" prop="views">
              <Input v-model="formValidate.views" placeholder="阅读量"></Input>
          </FormItem>
          <FormItem label="文章类型" prop="type">
              <Select v-model="formValidate.type" placeholder="选择文章类型">
                  <Option value="1">码农</Option>
                  <Option value="2">读书</Option>
                  <Option value="3">民谣</Option>
              </Select>
          </FormItem>
          <FormItem label="出版" prop="publish">
              <Select v-model="formValidate.publish" placeholder="出版">
                  <Option value="1">出版社</Option>
              </Select>
          </FormItem>
          <FormItem label="状态" prop="state">
              <Select v-model="formValidate.state" placeholder="文章状态">
                  <Option value="0">隐藏</Option>
                  <Option value="1">显示</Option>
              </Select>
          </FormItem>
          <FormItem label="Desc" prop="content">
              <!-- <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="内容"></Input> -->
              <mavon-editor :toolbars="toolbars" style="max-height: 600px;" ref="mavoneditor" v-if="formValidate.content || !$route.query.id" v-model="formValidate.content"  @imgAdd="$imgAdd"/>
          </FormItem>
          <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
      </Form>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import uploadBox from "~/components/upload";
import { blobToDataUri, putb64 } from "~/plugins/base";
import { setTimeout } from "timers";
export default {
  components: {
    uploadBox
  },
  async created() {
    // 编辑文章
    this.$route.query.id && (await this.articleDetail(this.$route.query.id));
    // 获取七牛token
    this.getToken();
  },
  data() {
    return {
      formValidate: {
        id: "",
        title: "",
        thumb: "",
        keyword: "",
        comments: "0",
        likes: "0",
        views: "0",
        type: "",
        publish: "",
        state: "",
        content: "",
        isEdit: false
      },
      ruleValidate: {
        id: [
          {
            required: true,
            message: "填写ID",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "填写标题",
            trigger: "blur"
          }
        ],
        thumb: [
          {
            required: true,
            message: "上传封面",
            trigger: "blur"
          }
        ],
        keyword: [
          {
            required: true,
            message: "填写关键字",
            trigger: "blur"
          }
        ],
        comments: [
          {
            required: true,
            message: "填写评论数",
            trigger: "blur"
          }
        ],
        likes: [
          {
            required: true,
            message: "填写文章喜欢",
            trigger: "blur"
          }
        ],
        views: [
          {
            required: true,
            message: "阅读量",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "内容",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "文章类型",
            trigger: "change"
          }
        ],
        publish: [
          {
            required: true,
            message: "出版",
            trigger: "change"
          }
        ],
        state: [
          {
            required: true,
            message: "文章状态",
            trigger: "change"
          }
        ]
      },
      qdata: {},
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  methods: {
    async articleDetail(id) {
      let { data } = await this.REQ_articleDetail(id);
      this.formValidate = data.data;
      this.formValidate.id = data.data.id.toString();
      this.formValidate.comments = data.data.meta.comments.toString();
      this.formValidate.likes = data.data.meta.likes.toString();
      this.formValidate.views = data.data.meta.views.toString();
      this.formValidate.type = data.data.type.toString();
      this.formValidate.publish = data.data.publish.toString();
      this.formValidate.state = data.data.state.toString();
      this.formValidate.isEdit = true;
    },
    getLoadPath(src) {
      console.log(src);
      this.formValidate.thumb = src;
    },
    async getToken() {
      const { data } = await this.REQ_qiniuToken();
      if (data.code === 0) this.qdata = data.data;
      else this.$Message.error(data.msg);
    },
    // 绑定@imgAdd event
    async $imgAdd(pos, file) {
      const msg = this.$Message.loading({
        content: "图片上传中...",
        duration: 0
      });
      // 转base64
      let img = await blobToDataUri(file);
      // 七牛需要去除base64图片前面
      img = img.replace(/^.*?,/, "");
      // base64上传七牛
      let data = await putb64(img, this.qdata.token).catch(() => {
        this.$Message.error("上传失败！！！");
      });
      this.$Message.success("上传成功");
      data = JSON.parse(data);
      let imgUrl = `${this.qdata.domain}${data.key}`;
      this.$refs.mavoneditor.$img2Url(pos, imgUrl);
      //关闭弹框
      msg();
    },
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          let res = await this.REQ_addArticle(this.formValidate);
          if (res.data.code === 0) {
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    ...mapActions(["REQ_addArticle", "REQ_qiniuToken", "REQ_articleDetail"])
  },
  mounted() {}
};
</script>

<style lang="less">
.from_box {
  .v-note-wrapper {
    z-index: 1;
  }
}
</style>

