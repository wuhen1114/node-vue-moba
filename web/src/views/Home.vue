<template>
  <div class="home">
    <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/banner_1.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/banner_2.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/banner_3.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination">1</div>
    </swiper>

    <div class="nav-icon bg-white text-center">
      <div class="nav-list d-flex">
        <div class="nav-item" v-for="(item, index) in 10" :key="index">
          <i class="sprite sprite-news"></i>
          <div class="text-dark-1">爆料站</div>
        </div>
      </div>
      <div class="py-2 d-flex ai-center jc-center">
        <i class="sprite sprite-packUp"></i>收起
      </div>
    </div>

    <m-card-list title="新闻资讯" icon="Menu" :categories="newCards">
      <template #items="{category}">
        <router-link tag="div" :to="`/newsDetail/${item1._id}`"
            class="swiper-li my-4 d-flex ai-center"
            v-for="(item1, index1) in category.newsList"
            :key="index1"
          >
            <span v-text="'['+item1.categoryName+']'"></span>
            <span>|</span>
            <span class="flex-1 mx-2 newsSec" v-text="item1.title"></span>
            <span v-text="item1.date"></span>
          </router-link>
      </template>
    </m-card-list>
    <m-card-list title="英雄列表" icon="apacherocketmq" :categories="heroCards">
      <template #items="{category}">
        <router-link tag="div" :to="`/hero/${item1._id}`"
            class="swiper-li my-4 heroLi"
            v-for="(item1, index1) in category.heroList"
            :key="index1"
          >
            <div class="img"><img :src="item1.avatar" alt=""></div>
            <div class="name" v-text="item1.title"></div>
          </router-link>
      </template>
    </m-card-list>
    <m-card-list title="精彩视频" icon="Menu" :categories="newCards">
      <template #items="{category}">
        <div
            class="swiper-li my-4 d-flex ai-center"
            v-for="(item1, index1) in category.newsList"
            :key="index1"
          >
            <span v-text="'['+item1.categoryName+']'"></span>
            <span>|</span>
            <span class="flex-1" v-text="item1.title"></span>
            <span v-text="item1.date"></span>
          </div>
      </template>
    </m-card-list>

    
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: "carrousel",
  filters: {
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        // Some Swiper option/callback...
      },
      isCardIndex: 1,
      newCards: [],
      heroCards: [],
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  created(){
    this.fetchNewsList()
    this.fetchHeroList()
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
  methods: {
    chooseCard(ind){
      this.isCardIndex = ind;
    },
    async fetchNewsList(){
      const res = await this.$http.get('news/list')
      this.newCards = res.data
      console.log(res.data)
    },
    async fetchHeroList(){
      const res = await this.$http.get('heros/list')
      this.heroCards = res.data
      console.log(res.data)
    }
  }
};
</script>

<style lang="scss">
.swiper {
  img {
    width: 100%;
  }
}

.nav-icon {
  margin: 1.0769rem 0;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  .nav-list {
    flex-wrap: wrap;
    .nav-item {
      width: 25%;
      padding: 3px 0;
      margin: 6px 0;
      border-right: 1px solid #ddd;
    }
    .nav-item:nth-child(4n) {
      border: 0;
    }
  }
}

.card-header {
  border-bottom: 1px solid #ddd;
  padding: 1.0769rem 0;
}

.card-body {
  padding: 0.7692rem 0;
  .card-nav {
    display: flex;
    justify-content: space-around;
    .nav-item {
      padding-bottom: 0.2308rem;
    }
  }
}

.newsSec {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.heroLi {
  text-align: center;
  display: inline-block;
  width: 18%;
  margin: 1rem 1%;
  .img {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
