<template>
  <div class="article" v-if="article">
    <div class="title d-flex jc-between ai-center px-3 py-3">
       <div class="back" @click="backFn" v-text="'<'"></div>
       <div class="flex-1 mx-2 tit">{{article.title}}</div>
       <div class="text-grey fs-xs">2020-09-01</div>
    </div>
    <div class="content" v-html="article.body"></div>
    <div class="px-3 my-3">
        <div class="d-flex ai-center my-3 botTit">
            <i class="iconfont icon-Menu"></i><span class="mx-1">相关资讯</span>
        </div>
        <router-link class="my-2" tag="div" :to="`/newsDetail/${item._id}`" v-for="(item, index) in article.related" :key="index">{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data(){
      return {
          article: '',
      }
  },
  watch: {
      id(){
          this.fetch()
      }
  },
  created(){
      this.fetch()
  },
  methods: {
      async fetch(){
          const res = await this.$http.get(`/article/${this.id}`)
          this.article = res.data;
          console.log(res)
      },
      backFn(){
          this.$router.go(-1)
      },
  }
};
</script>

<style lang="scss">
.title {
    border-bottom: 1px solid #ddd; 
    width: 100%;
    .back {
        font-size: 2rem;
    }
    .tit {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #4394e4;
        font-weight: bold;
    }
}

.content {
    padding: 1rem 1rem;
    font-size: 1.2rem;
    img {
        max-width: 100%;
        height: auto;
    }
    p {
        line-height: 1.8rem;
    }
}

.botTit {
    color: #4394e4;
    font-weight: bold;
    font-size: 1rem;
}

</style>