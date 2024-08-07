import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { GridCellItemCodes } from '@/types/inventory/grid-cell-item-codes';
import type { GridCellItemDetails } from '@/types/inventory/grid-cell-item-details';

export const useInventoryItemDetailStore = defineStore('inventoryItemDetail', () => {
  const details = ref(
    new Map<GridCellItemCodes, GridCellItemDetails>([
      ['green-box', { title: 'Green Box', image: '/img/item/dark/green-box-small.png' }],
      ['golden-box', { title: 'Golden Box', image: '/img/item/dark/golden-box-small.png' }],
      ['blue-box', { title: 'Blue Box', image: '/img/item/dark/blur-box-small.png' }],
    ]),
  );

  function getTitleByCode(code: GridCellItemCodes) {
    return details.value.get(code)?.title;
  }

  function getImageByCode(code: GridCellItemCodes) {
    return details.value.get(code)?.image;
  }

  return { details, getTitleByCode, getImageByCode };
});
