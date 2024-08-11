import { defineStore } from 'pinia';
import type { GridCell } from '@/types/inventory/grid-cell';
import type { GridCellItem } from '@/types/inventory/grid-cell-item';

interface SavedGridCellItem {
  cellId: number;
  data: GridCellItem;
}

export const useInventoryItemStore = defineStore('inventoryItem', () => {
  const localStorageKey = 'items';

  function saveToLocalStorage(cells: GridCell[]): void {
    const items: SavedGridCellItem[] = [];

    cells.forEach((c) => {
      if (c.item != null) {
        items.push({
          cellId: c.id,
          data: c.item,
        });
      }
    });

    localStorage.setItem(localStorageKey, JSON.stringify(items));
  }

  function loadFromLocalStorage(): GridCell[] {
    const items = JSON.parse(
      localStorage.getItem(localStorageKey) || '[]',
    ) as Array<SavedGridCellItem>;

    // Default items if localStorage's items is not exist
    if (items.length === 0) {
      items.push({
        cellId: 0,
        data: {
          code: 'green-box',
          count: 10,
        },
      });

      items.push({
        cellId: 1,
        data: {
          code: 'golden-box',
          count: 2,
        },
      });

      items.push({
        cellId: 2,
        data: {
          code: 'blue-box',
          count: 6,
        },
      });
    }

    const cells: GridCell[] = [];

    items.forEach((i) => {
      cells.push({
        id: i.cellId,
        item: i.data,
      });
    });

    return cells;
  }

  return { saveToLocalStorage, loadFromLocalStorage };
});
