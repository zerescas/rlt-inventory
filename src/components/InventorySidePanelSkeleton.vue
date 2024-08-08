<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
import skeletonHeaderImage from '@/assets/img/sidepanel/skeleton.png';
</script>

<template>
  <div class="inventory-sidepanel-card skeleton">
    <div class="header">
      <img :src="skeletonHeaderImage" alt="skeleton-img" />
      <AnimatedPlaceholder width="190px" height="26px" borderRadius="8px" />
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
