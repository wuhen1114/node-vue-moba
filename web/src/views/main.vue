<template>
  <div class="app">
    <div class="topBar bg-black py-2 px-4 d-flex ai-center">
        <img src="../assets/logo.png" alt="">
        <div class="mx-3 mt-1 flex-1">
            <div class="text-white">王者荣耀</div>
            <div class="text-grey-1 mt-1 fs-xxs">团队成就更多</div>
        </div>
        <button type="button" class="btn bg-primary">点击下载</button>
    </div>
    <div class="main bg-primary pt-4 pb-2">
        <div class="nav d-flex jc-around">
            <div class="nav-item pb-1" @click="chooseLinkFn(1)" :class="{active: isShow == 1}">
                <router-link class="nav-link" to="/">首页</router-link>
            </div>
            <div class="nav-item pb-1" @click="chooseLinkFn(2)" :class="{active: isShow == 2}">
                <router-link class="nav-link" to="/about">攻略中心</router-link>
            </div>
            <div class="nav-item pb-1" @click="chooseLinkFn(3)" :class="{active: isShow == 3}">
                <router-link class="nav-link" to="/about">赛事中心</router-link>
            </div>
        </div>
      <!-- <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    data(){
        return {
            isShow: 1,
        }
    },
    methods: {
        chooseLinkFn(ind){
            this.isShow = ind
        }
    }
}
</script>

<style lang="scss">
.topBar {
    position: sticky;
    top: 0;
    color: #fff;
    z-index: 9999999999;
    img {
        width: 2.6rem;
        border-radius: 0.5rem;
    }
}

.active {
    border-bottom: 2px solid #fff;
}
</style>