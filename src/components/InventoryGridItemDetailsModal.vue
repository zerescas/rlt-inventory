<script setup lang="ts">
import type { PropType } from 'vue';
import type { GridCellItem } from '@/types/inventory/grid-cell-item';
import { useInventoryItemDetailStore } from '@/stores/inventoryItemDetail';
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';

const inventoryItemDetailStore = useInventoryItemDetailStore();

defineProps({
  item: {
    type: Object as PropType<GridCellItem>,
    required: true,
  },
});
</script>

<template>
  <div class="inventory-grid-item-details-modal">
    <div class="header">
      <img class="item-image" :src="item && inventoryItemDetailStore.getImageByCode(item.code)">
    </div>

    <div class="content skeleton">
      <h2 class="item-title">
        <AnimatedPlaceholder height="30px" width="100%" borderRadius="8px" />
      </h2>

      <p class="item-description">
        <AnimatedPlaceholder height="10px" width="100%" />
        <AnimatedPlaceholder height="10px" width="100%" />
        <AnimatedPlaceholder height="10px" width="100%" />
        <AnimatedPlaceholder height="10px" width="85%" />
        <AnimatedPlaceholder height="10px" width="40%" />
      </p>
    </div>

    <div class="footer">Actions</div>
  </div>
</template>
