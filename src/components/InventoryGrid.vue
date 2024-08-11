<script setup lang="ts">
import { ref, watch } from 'vue';
import InventoryGridCell from './InventoryGridCell.vue';
import InventoryGridItemDetailsModal from './InventoryGridItemDetailsModal.vue';
import type { GridCell } from '@/types/inventory/grid-cell';
import { useInventoryItemStore } from '@/stores/inventoryItem';

const inventoryItemStore = useInventoryItemStore();

/* Init cells */
// Create empty cells
const cells = ref<GridCell[]>([]);

for (let i = 0; i < 25; i++) {
  let obj: GridCell = {
    id: i,
    item: null,
  };
  cells.value.push(obj);
}

// Attempt to load items from localStorage and place by cells
inventoryItemStore.loadFromLocalStorage().forEach((loadedCell) => {
  cells.value[loadedCell.id].item = loadedCell.item;
});

// Watch for cells changes and save items to localStorage
watch(cells.value, () => {
  inventoryItemStore.saveToLocalStorage(cells.value);
});

/* Cell actions */
const selectedCell = ref<GridCell | null>();
function selectCell(cell: GridCell) {
  if (cell.item === null) return;

  selectedCell.value = cell;
}

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
        :draggable="{
          handleDragStart: (draggable) => {
            const isCellEmpty = draggable.item.value.item == null;
            if (isCellEmpty) return false;

            selectedCell = null;
          },
        }"
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
