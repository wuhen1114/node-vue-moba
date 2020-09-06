<template>
  <m-card :title="title" :icon="icon">
    <div class="card-body">
      <div class="card-nav">
        <div
          class="nav-item"
          v-for="(item, index) in categories"
          :key="index"
          @click="$refs.list.$swiper.slideTo(index)"
          :class="{active_1: isCardIndex == index}"
        >
          <div class="nav-link" v-text="item.name"></div>
        </div>
      </div>
      <swiper ref="list" :options="{autoHeight: true}" @slide-change="() => isCardIndex = $refs.list.$swiper.realIndex">
        <swiper-slide v-for="(category, index) in categories" :key="index">
            <slot name="items" :category="category"></slot>
          
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      isCardIndex: 0,
    };
  },
  methods: {
    chooseCard(ind) {
      this.isCardIndex = ind;
    },
    change(e){
      console.log(e)
    }
  },
};
</script>