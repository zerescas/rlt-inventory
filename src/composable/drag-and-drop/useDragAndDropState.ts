import { readonly, type DeepReadonly, type UnwrapNestedRefs } from 'vue';
import type { Draggable } from './useDrag';
import type { Dropzone } from './useDrop';

interface DragAndDropStateReturn {
  draggables: DeepReadonly<UnwrapNestedRefs<Draggable<Object>[]>>;
  dropzones: DeepReadonly<UnwrapNestedRefs<Dropzone[]>>;
  addDraggable: <T>(draggable: Draggable<T>) => void;
  removeDraggable: <T>(draggable: Draggable<T>) => void;
  addDropzone: (dropzone: Dropzone) => void;
  removeDropzone: (dropzone: Dropzone) => void;
  findDropzone: (predicate: (d: Dropzone) => {}) => Dropzone | undefined;
}

// The Draggable/Dropzone collections
let draggables: Draggable<any>[] = [];
let dropzones: Dropzone[] = [];

export const useDragAndDropState = (): DragAndDropStateReturn => {
  function addDraggable<T>(draggable: Draggable<T>) {
    draggables.push(draggable);
  }

  function removeDraggable<T>(draggable: Draggable<T>) {
    draggables = draggables.filter((d) => d !== draggable);
  }

  function addDropzone(dropzone: Dropzone) {
    dropzones.push(dropzone);
  }

  function removeDropzone(dropzone: Dropzone) {
    dropzones = dropzones.filter((d) => d !== dropzone);
  }

  /**
   * Try to find a dropzone with predicate
   * @param predicate
   * @returns
   */
  function findDropzone(predicate: (d: Dropzone) => {}): Dropzone | undefined {
    return dropzones.find(predicate);
  }

  return {
    draggables: readonly(draggables),
    dropzones: readonly(dropzones),
    addDraggable,
    removeDraggable,
    addDropzone,
    removeDropzone,
    findDropzone,
  };
};
