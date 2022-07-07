<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 导航栏 -->
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field name="手机号" placeholder="请输入手机号" v-model="user.mobile">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field name="验证码" placeholder="请输入验证码" v-model="user.code">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button class="sm-btn" size="small" round type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div class="login-btn-success">
        <van-button
          class="login-btn-wrap"
          block
          type="info"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- 登录表单 -->
  </div>
</template>

<script>
// 导入用户登录接口文档
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      //   //获取表单数据
      const user = this.user
      //   //表单验证
      //   //提交表单请求登录
      try {
        const res = await login(user)
        console.log('登录成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
        } else {
          console.log('登陆失败', err)
        }
      }
      //   //根据请求响应结果处理后续操作
    }
  }
}
</script>

<style scoped>
.sm-btn {
  background-color: #ededed;
  color: #666;
}
.login-container .toutiao {
  font-size: 20px;
  /* padding-bottom: 50px; */
}
.login-btn-success {
  padding: 23px 23px;
}
.login-btn-wrap {
  background-color: #6db4fb;
  border: none;
}
</style>
