import { ref, toRefs } from 'vue';
import { defineStore } from 'pinia';
import type { GridCellItemCodes } from '@/types/inventory/grid-cell-item-codes';
import type { GridCellItemDetails } from '@/types/inventory/grid-cell-item-details';
import { useThemeStore } from './useThemeStore';

export const useInventoryItemDetailStore = defineStore('inventoryItemDetail', () => {
  const { mode } = toRefs(useThemeStore());
  const pathToImages = '/img/item';

  const details = ref(
    new Map<GridCellItemCodes, GridCellItemDetails>([
      ['green-box', { title: 'Green Box', image: `green-box-small.png`}],
      ['golden-box', { title: 'Golden Box', image: 'golden-box-small.png' }],
      ['blue-box', { title: 'Blue Box', image: 'blur-box-small.png' }],
    ]),
  );

  function getTitleByCode(code: GridCellItemCodes) {
    return details.value.get(code)?.title;
  }

  function getImageByCode(code: GridCellItemCodes) {
    return pathToImages + `/${mode.value}/` + details.value.get(code)?.image;
  }

  return { details, getTitleByCode, getImageByCode };
});
