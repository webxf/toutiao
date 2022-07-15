<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <follow-user
            class="follow-btn"
            :user-id="article.aut_id"
            v-model="article.is_followed"
          ></follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="contentRef"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域 -->
        <commentList
          :source="article.art_id"
          @load-count="totalCount = $event.total_count"
          :list="commentList"
        ></commentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCount" color="#777" />
          <!--  -->
          <collectArticle
            v-model="article.is_collected"
            :article-id="article.art_id"
          />
          <LikeArticle
            v-model="article.attitude"
            :article-id="article.art_id"
          ></LikeArticle>
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <van-popup v-model="isShow" position="bottom"
          ><commentPost
            :target="article.art_id"
            @update-input="pubContent"
          ></commentPost
        ></van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleId } from '@/api/article'
import { ImagePreview } from 'vant'
import followUser from '@/components/follow-user'
import collectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article/index.vue'
import commentList from '@/views/article/components/comment-list.vue'
import commentPost from '@/views/article/components/comment-post.vue'

export default {
  name: 'ArticleIndex',
  components: {
    followUser,
    collectArticle,
    LikeArticle,
    commentList,
    commentPost
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      followLoading: false,
      totalCount: 0,
      isShow: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getArticle()
  },
  mounted() {},
  methods: {
    async getArticle() {
      this.loading = true
      try {
        const { data } = await getArticleId(this.articleId)
        // if (Math.random() > 0.5) {
        //   JSON.parse('asadsdsa')
        // }
        // 初始化图片预览
        setTimeout(() => {
          this.previewImage()
          // console.log(this.$refs['article-content'])
        }, 0)
        console.log(data)
        this.article = data.data
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        // console.log(err)
      }
      this.loading = false
    },
    previewImage() {
      const articleContent = this.$refs.contentRef
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            // 起始位置
            startPosition: index
          })
        }
      })
    },
    pubContent(data) {
      this.isShow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 32px;
    bottom: 28px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 22px;
      padding: 30px 18px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 20px;
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 14px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 14px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 100px;
        height: 30px;
      }
    }

    .article-content {
      padding: 35px 12px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 150px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 38px;
      color: #b4b4b4;
    }
    .text {
      font-size: 16px;
      color: #666666;
      margin: 20px 0 16px;
    }
    .retry-btn {
      width: 160px;
      height: 40px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 16px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    margin-bottom: 50px;
    .comment-btn {
      width: 182px;
      height: 30px;
      border: 2px solid #eeeeee;
      font-size: 18px;
      line-height: 30px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 12px;
        background-color: #e22829;
      }
    }
  }
}
</style>
