<script setup lang="ts">
import { computed } from 'vue';

import { useDrag } from '@/composable/drag-and-drop/useDrag';
import { useDrop, type DropzoneEventHandlers } from '@/composable/drag-and-drop/useDrop';
import type { Draggable } from '@/composable/drag-and-drop/useDrag';

import type { GridCell } from '@/types/inventory/grid-cell';
import { useInventoryItemDetailStore } from '@/stores/inventoryItemDetail';
import type { DraggableEventHandlers } from '@/composable/drag-and-drop/useDrag';

const inventoryItemDetailStore = useInventoryItemDetailStore();

const props = defineProps<{
  cell: GridCell;
  draggable?: DraggableEventHandlers<GridCell>;
  dropzone?: DropzoneEventHandlers<GridCell>;
}>();

const image = computed(() => {
  if (!props.cell.item) return '';
  return inventoryItemDetailStore.getImageByCode(props.cell.item.code)
});

const [initDrag, draggable] = useDrag<GridCell>({
  type: 'inventory-grid-cell',
  item: props.cell,

  draggingCloneClass: 'dragging',

  onDragStart: (draggable) => props.draggable?.handleDragStart?.(draggable),
  onSuccessfulDrop: (draggable) => props.draggable?.handleSuccessfulDrop?.(draggable),
});

const [initDrop, dropzone] = useDrop({
  accepts: 'inventory-grid-cell',
  dropZoneClass: 'dropzone',

  onSuccessfulDrop(draggable: Draggable<GridCell>) {
    [props.cell.item, draggable.item.value.item] = [draggable.item.value.item, props.cell.item];
  },
});
</script>

<template>
  <div
    :ref="(node) => initDrop(initDrag(node))"
    class="inventory-grid-cell-card"
  >
    <div class="item" v-if="cell?.item">
      <img class="image" :src="image" />

      <div class="count">
        {{ cell.item.count }}
      </div>
    </div>
  </div>
</template>
