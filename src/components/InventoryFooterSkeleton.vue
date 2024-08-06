<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
</script>

<template>
  <div class="inventory-footer skeleton">
    <AnimatedPlaceholder width="100%" height="36px" />
  </div>
</template>

<style lang="scss" scoped>
.inventory-footer {
  @include card-mixins.body;
  @include card-mixins.content;

  padding: var(--theme-padding-footer-skeleton);
}
</style>
