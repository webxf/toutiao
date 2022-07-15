<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <ArticleList :channels="channel"></ArticleList>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit
        :channels="channels"
        :active="active"
        @update="updateActive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from '../home/components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 1,
      channels: [],
      isChannelEditShow: false
    }
  },
  created() {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels() {
      try {
        // const { data } = await getUserChannels();
        // console.log(data);
        // this.channels = data.data.channels;
        // 已登录，请求获取用户列表
        let channels = []
        if (this.user) {
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断是否是本地频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            channels = localChannels
          } else {
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道列表失败')
      }
    },
    updateActive(index, isChannelEditShow = true) {
      console.log(index)
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>

<style lang="less" scope>
.home-container {
  padding-bottom: 50px;
  padding-top: 92px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 305px;
    height: 34px;
    background-color: #5babfb;
    border: none;
    font-size: 15px;
  }
  .van-icon {
    font-size: 18px;
  }
}
.channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 46px;
    z-index: 1;
    left: 0;
    right: 0;
    // height: 82px;
  }
  .van-tab {
    width: 100px;
    height: 48px;
    border-right: 1px solid #edeff3;
    font-size: 14px;
    color: #777;
  }
  .van-tab--active {
    color: #333;
  }
  .van-tabs__nav {
    padding-bottom: 0;
  }
  .van-tabs__line {
    width: 21px !important;
    height: 4px;
    background-color: #3296fa;
    bottom: 4px;
  }
  .placeholder {
    flex-shrink: 0;
    width: 45px;
    height: 44px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    width: 45px;
    height: 44px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 18px;
      padding-top: 14px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      // width: 1px;
      height: 100%;
      background-image: url(../../assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
