<script setup lang="ts">
import type { PropType } from 'vue';
import type { GridCell } from '@/types/inventory/grid-cell';
import { useInventoryItemDetailStore } from '@/stores/inventoryItemDetail';

const inventoryItemDetailStore = useInventoryItemDetailStore();

defineProps({
  cell: Object as PropType<GridCell>,
});
</script>

<template>
  <div class="inventory-grid-cell-card">
    <div class="item" v-if="cell?.item">
      <img class="image" :src="inventoryItemDetailStore.getImageByCode(cell.item.code)" />

      <div class="count">
        {{ cell.item.count }}
      </div>
    </div>
  </div>
</template>
