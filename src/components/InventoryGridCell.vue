<script setup lang="ts">
import type { PropType } from 'vue';
import type { GridCell } from '@/types/inventory/grid-cell';

defineProps({
  cell: Object as PropType<GridCell>,
});
</script>

<template>
  <div class="inventory-grid-cell-card">
    <div class="item" v-if="cell?.item">
      <div class="count">
        {{ cell.item.count }}
      </div>
    </div>
  </div>
</template>
