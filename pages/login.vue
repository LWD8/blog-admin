<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" style="width: 200px;">
        <FormItem prop="username">
            <Input type="text" v-model="formInline.username" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
    </Form>
</template>
<script>
import { mapActions } from 'vuex'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      formInline: {
        username: "13005678340",
        password: "123456"
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "最小6位数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          const res = await this.REQ_adminLogin(this.formInline)
          if (res.data.code === 0) {
            Cookies.set('access_token', res.data.data.token);
            Cookies.set('userInfo', JSON.stringify(res.data.data));
            this.$Message.success(res.data.msg)
            this.$router.replace({
              name: 'index'
            })
          }
        }
      });
    },

    ...mapActions([
      'REQ_adminLogin'
    ])
  }
};
</script>
