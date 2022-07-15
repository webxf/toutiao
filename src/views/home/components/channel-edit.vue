<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :border="false" :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in channels"
        :key="index"
        @click="changeChannels(item, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !changeChannel.includes(item.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false">
      <div slot="title" class="title-text">推荐频道</div>
    </van-cell>
    <van-grid :border="false" :gutter="10" class="recommend-grid">
      <van-grid-item
        :text="item.name"
        class="grid-item"
        v-for="(item, index) in recommendChannels"
        :key="index"
        icon="plus"
        @click="addFn(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, getAddList, DeleteList } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  data() {
    return {
      channelsList: [],
      isEdit: false,
      changeChannel: [0]
    }
  },
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created() {
    this.getChannels()
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      const channelsarr = []
      this.channelsList.forEach((channel) => {
        const result = this.channels.find((channels) => {
          return channels.id === channel.id
        })
        if (!result) {
          channelsarr.push(channel)
        }
      })
      return channelsarr
    }
  },
  methods: {
    async getChannels() {
      try {
        const { data } = await getAllChannels()
        this.channelsList = data.data.channels
        console.log(data)
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    async addFn(channel) {
      this.channels.push(channel)
      if (this.user) {
        try {
          await getAddList({
            id: channel.id,
            seq: this.channels.length
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },
    changeChannels(item, index) {
      if (this.isEdit) {
        // 固定频道，不删除
        if (this.changeChannel.includes(item.id)) {
          return
        }
        // 编辑状态，执行删除操作
        this.channels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('update', this.active - 1, true)
        }

        this.deleteFn(item)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update', index, false)
      }
    },
    async deleteFn(channel) {
      try {
        if (this.user) {
          await DeleteList(channel.id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.channels)
        }
        // this.$toast("删除成功");
      } catch (err) {
        this.$toast('删除失败')
      }
    }
  }
}
</script>

<style lang="less" scope>
.channel-edit {
  padding-top: 50px;
  .title-text {
    font-size: 14px;
    color: #333;
  }
  .edit-btn {
    width: 50px;
    height: 25px;
    font-size: 13px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .grid-item {
    width: 100px;
    height: 46px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 12px;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: 4px;
        top: -7px;
        font-size: 16px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 16px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
