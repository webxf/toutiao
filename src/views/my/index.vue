<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header" user-info>
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round class="btnzi">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('./login')">
        <img class="mobile-img" src="../../assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link class="message" />
    <van-cell title="小智同学" is-link class="mb-9" />
    <van-cell
      title="退出登录"
      class="logout-cell"
      v-if="user"
      clickable
      @click="loginOut"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    // 如果用户登录，则请求加载用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    loginOut() {
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消')
        })
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        // console.log(data);
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scope>
.header {
  height: 210px;
  background-image: url('../../assets/banner.png');
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile-img {
      width: 75px;
      height: 75px;
      margin-bottom: 10px;
    }
    .text {
      font-size: 16px;
      color: #fff;
    }
  }
}

.base-info {
  height: 150px;
  // background-color: pink;
  padding: 36px 20px 23px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .avatar {
      width: 82px;
      height: 82px;
      margin-right: 23px;
      border: 2px solid #fff;
    }
    .name {
      font-size: 18px;
      color: #fff;
    }
  }
  .right .btnzi {
    margin-bottom: 14px;
  }
}
.data-stats {
  // background-color: grey;
  display: flex;
  .data-item {
    height: 60px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    .count {
      font-size: 18px;
    }
    .text {
      font-size: 14px;
    }
  }
}
.grid-nav {
  .grid-item {
    height: 80px;
    i.toutiao {
      font-size: 20px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    span.text {
      font-size: 16px;
    }
    .toutiao-lishi {
      color: #ff9d19;
    }
  }
}
.mb-9 {
  font-size: 16px;
}
.message {
  font-size: 16px;
  margin-top: 7px;
}
.logout-cell {
  text-align: center;
  font-size: 16px;
  color: #ec5859;
  margin-top: 4px;
}
</style>
