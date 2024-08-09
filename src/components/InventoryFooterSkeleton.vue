<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
import IconClose from './icons/IconClose.vue';
</script>

<template>
  <div class="inventory-footer-card skeleton">
    <div class="content">
      <AnimatedPlaceholder width="100%" height="36px" borderRadius="12px" />
    </div>

    <button class="icon-button card-close-button">
      <IconClose />
    </button>
  </div>
</template>
