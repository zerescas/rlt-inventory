<script setup lang="ts">
import { ref } from 'vue';
import { swap} from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/vue';
import InventoryGridCell from './InventoryGridCell.vue';
import type { GridCell } from '@/types/inventory/grid-cell';

/* Init Drag'n Drop behavior */
const [cellsRef, cells] = useDragAndDrop<GridCell>([], {
  dropZoneClass: 'dropzone',
  touchDropZoneClass: 'dropzone',

  plugins: [swap()],
});

/* Fill cells with placeholder data */
for (let i = 0; i < 25; i++) {
  let obj: GridCell = {
    id: i,
    item: {
      code: 'green-box',
      count: i,
    },
  };

  if (i > 3 && i < 7) {
    obj.item!.code = 'golden-box';
  } else if (i >= 7 && i < 13) {
    obj.item!.code = 'blue-box';
  } else if (i >= 13) {
    obj.item = null;
  }

  cells.value.push(obj);
}
</script>

<template>
  <div class="inventory-grid-card">
    <div ref="cellsRef" class="cells">
      <InventoryGridCell
        v-for="cell in cells"
        :key="cell.id"
        :cell
      />
    </div>
  </div>
</template>
