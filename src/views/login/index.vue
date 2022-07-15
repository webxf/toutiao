<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.codes"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="6000 * 10"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="sm-btn"
            size="small"
            round
            type="default"
            native-type="button"
            @click="OnSendSms"
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
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '请输入正确的手机号'
          },
          {
            pattern: /^1[3|5|7|8]|d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}%/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit() {
      //   //获取表单数据
      const user = this.user
      //   //表单验证
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间如果是0，则持续展示
      })
      //   //提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        // console.log("登录成功", res);
        this.$toast.success('登录成功')
        // back()实现登陆页面的跳转，但是此方法不严谨
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败', err)
        }
      }
      //   //根据请求响应结果处理后续操作
    },
    async OnSendSms() {
      // console.log("OnSendSms");
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证是吧', err)
      }
      this.isCountDownShow = true
      // 请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        this.$toast('发送成功')
        // console.log("发送成功", res);
      } catch (err) {
        // 发送失败，倒计时隐藏
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
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
