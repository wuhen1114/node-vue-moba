<template>
  <div class="card px-4 bg-white">
    <div class="card-header d-flex">
      <i class="iconfont mr-2" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1">{{title}}</div>
      <i class="iconfont icon-19"></i>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
  },
};
</script>