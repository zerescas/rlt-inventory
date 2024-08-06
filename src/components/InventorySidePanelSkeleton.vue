<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
import skeletonHeaderImage from '@/assets/img/sidepanel/skeleton.png';
</script>

<template>
  <div class="inventory-sidepanel skeleton">
    <div class="header">
      <img :src="skeletonHeaderImage" alt="skeleton-img"/>
      <AnimatedPlaceholder width="190px" height="26px" />
    </div>

    <div class="content">
      <AnimatedPlaceholder width="155px" height="10px" />
      <AnimatedPlaceholder width="190px" height="10px" />
      <AnimatedPlaceholder width="170px" height="10px" />
      <AnimatedPlaceholder width="160px" height="10px" />
      <AnimatedPlaceholder width="140px" height="10px" />
    </div>

    <div class="footer">
      <AnimatedPlaceholder width="80px" height="10px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inventory-sidepanel {
  @include card-mixins.body;
  @include card-mixins.content;

  padding: 16px 23px;
}

.header {
  @include card-mixins.content;

  gap: 20px;
  margin-bottom: 20px;
}

.content {
  @include card-mixins.content;

  gap: 16px;
  margin-bottom: 24px;
}
</style>
