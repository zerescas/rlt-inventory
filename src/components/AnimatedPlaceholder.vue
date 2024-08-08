<script setup lang="ts">
defineProps({
  borderRadius: String,
  height: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="animated-placeholder"
    :class="{ 'custom-border-radius': borderRadius != undefined }"
  ></div>
</template>

<style scoped>
.animated-placeholder {
  animation: bg-animate 1.5s linear infinite;
  background-image: linear-gradient(
    to right,
    var(--theme-color-background-skeleton-1) 10%,
    var(--theme-color-background-skeleton-2) 40%,
    var(--theme-color-background-skeleton-3) 60%,
    var(--theme-color-background-skeleton-1) 90%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  height: v-bind(height);
  width: v-bind(width);
}

.custom-border-radius {
  border-radius: v-bind('borderRadius');
}

@keyframes bg-animate {
  0% {
    background-position: 50% 0;
  }

  100% {
    background-position: -150% 0;
  }
}
</style>
