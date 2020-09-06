<template>
  <div class="hero" v-if="model">
    <div class="topBar bg-black py-2 px-4 d-flex ai-center">
      <img src="../assets/logo.png" alt />
      <div class="mx-3 mt-1 flex-1 d-flex">
        <div class="text-white">王者荣耀</div>
        <div class="text-white mx-3">攻略站</div>
      </div>
      <router-link to="/">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info d-flex jc-between " style="align-items: flex-end">
        <div class="px-3 py-3 text-white">
          <div>{{model.title}}</div>
          <h2 class="my-2">{{model.name}}</h2>
          <div>{{model.categories.map(v => v.name).join('/')}}</div>
          <div v-if="model.scores">
            <span>难度</span>
            <span class="bg-primary maths">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="maths" style="background-color: #223996">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="maths" style="background-color: #934343">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="bg-dark maths">{{model.scores.survive}}</span>
          </div>
        </div>
        <router-link to="/" tag="span" class="px-3 py-3 text-white">皮肤 &gt;</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heros/${this.id}`);
      this.model = res.data;
      console.log(this.model);
    },
  },
};
</script>

<style lang="scss" scoped>
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
.top {
  height: 50vw;
  background: #fff no-repeat top center;
  background-size: auto 100%;
}
.maths {
  display: inline-block;
  height: 1rem;
  width: 1rem;
//   line-height: 1rem;
  text-align: center;
  border-radius: 50%;
  margin: 0 0.4615rem 0 0.2308rem;
  font-size: 0.7692rem;
}
.info {
    height: 100%;
    align-items: flex-end;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
</style>