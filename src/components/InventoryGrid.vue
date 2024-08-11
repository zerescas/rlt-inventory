<script setup lang="ts">
import { ref } from 'vue';
import InventoryGridCell from './InventoryGridCell.vue';
import InventoryGridItemDetailsModal from './InventoryGridItemDetailsModal.vue';
import type { GridCell } from '@/types/inventory/grid-cell';

/* Init and fill cells with placeholder data */
const cells = ref<GridCell[]>([]);

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

/* Cell selection */
const selectedCell = ref<GridCell | null>();

function selectCell(cell: GridCell) {
  if (cell.item === null) return;

  selectedCell.value = cell;
}

/* Cell actions */
function deleteItemInCell(cell: GridCell, count: number) {
  const cellToDelete = cells.value.find((c) => cell === c);

  if (!cellToDelete || !cellToDelete.item) return;

  cellToDelete.item.count -= count;

  if (cellToDelete.item.count <= 0) {
    cellToDelete.item = null;
    selectedCell.value = null;
  }
}
</script>

<template>
  <div class="inventory-grid-card">
    <div class="cells">
      <InventoryGridCell
        v-for="cell in cells"
        :key="cell.id"
        :cell
        :class="{ selected: selectedCell === cell }"
        @click="selectCell(cell)"
      />
    </div>

    <Transition name="slide-from-left">
      <div class="modal-card" v-if="selectedCell?.item">
        <InventoryGridItemDetailsModal
          :cell="selectedCell"
          @deleteItem="deleteItemInCell"
          @unSelectItem="selectedCell = null"
        />
      </div>
    </Transition>
  </div>
</template>
