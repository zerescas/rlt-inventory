<script setup lang="ts">
import type { PropType } from 'vue';
import type { GridCell } from '@/types/inventory/grid-cell';
import { useInventoryItemDetailStore } from '@/stores/inventoryItemDetail';
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';

const inventoryItemDetailStore = useInventoryItemDetailStore();

defineProps({
  cell: {
    type: Object as PropType<GridCell>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'deleteItem', cell: GridCell): void;
}>();
</script>

<template>
  <div class="inventory-grid-item-details-modal">
    <div class="header">
      <img class="item-image" :src="inventoryItemDetailStore.getImageByCode(cell.item!.code)" />
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

    <div class="footer">
      <button class="button button-primary button-size-m" @click="emit('deleteItem', cell!)">
        Удалить предмет
      </button>
    </div>
  </div>
</template>
