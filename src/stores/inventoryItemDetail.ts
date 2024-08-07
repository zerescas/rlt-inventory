import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { GridCellItemCodes } from '@/types/inventory/grid-cell-item-codes';
import type { GridCellItemDetails } from '@/types/inventory/grid-cell-item-details';

export const useInventoryItemDetailStore = defineStore('inventoryItemDetail', () => {
  const details = ref(
    new Map<GridCellItemCodes, GridCellItemDetails>([
      ['green-box', { title: 'Green Box' }],
      ['golden-box', { title: 'Golden Box' }],
      ['blue-box', { title: 'Blue Box' }],
    ]),
  );

  function getTitleByCode(code: GridCellItemCodes) {
    return details.value.get(code)?.title;
  }

  return { details, getTitleByCode };
});
