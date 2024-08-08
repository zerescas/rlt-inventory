import type { GridCellItem } from "./grid-cell-item"

export interface GridCell {
  id: number
  item: GridCellItem | null
}