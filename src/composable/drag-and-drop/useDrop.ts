import { onMounted, onUnmounted, ref, type Ref } from 'vue';

import { useDragAndDropState } from './useDragAndDropState';
import type { Draggable } from './useDrag';

/**
 * Dropzone state
 */
export interface Dropzone {
  /**
   * What type of draggable should be accepted
   */
  accepts: string;

  /**
   * The reactive reference holding the value of dropzone element
   */
  element: Ref<HTMLElement | null | undefined>;

  /**
   * Function to enter dropzone with draggable
   * @param draggable
   * @returns
   */
  enter: (draggable: Draggable<any>) => void;

  /**
   * Function to leave dropzone with draggable
   * @param draggable
   * @returns
   */
  leave: (draggable: Draggable<any>) => void;

  /**
   * Function to check if draggable can be dropped in dropzone
   * @param draggable
   * @returns
   */
  canDrop: (draggable: Draggable<any>) => boolean;

  /**
   * Function to drop draggable into dropzone
   * @param draggable
   * @returns Return true - if drop is successful / false - if drop was failed
   */
  drop: (draggable: Draggable<any>) => boolean;
}

interface DropOptions {
  /**
   * What type of draggable should be allowed to drop in the dropzone
   */
  accepts: string;

  /**
   * Optional class name to be added to the dropzone element while any valid draggable is over the dropzone
   */
  dropZoneClass?: string;

  /**
   * Optional callback function that is triggered when a drop attempt was made
   * @param draggable - The draggable state that tries to drop to a dropzone
   * @returns
   */
  onDropAttempt?: (draggable: Draggable<any>) => void;

  /**
   * Optional callback function that is triggered when a drop attempt was failed
   * @param draggable - The draggable state that failed to drop to a dropzone
   * @returns
   */
  onFailedDrop?: (draggable: Draggable<any>) => void;

  /**
   * Optional callback function that is triggered when a drop attempt was successful
   * @param draggable - The draggable state that dropped to a dropzone
   * @returns
   */
  onSuccessfulDrop?: (draggable: Draggable<any>) => void;
}

interface DropReturn {
  /**
   * Function to be used with an HTML element's `ref` attribute to give the element drop functionality
   * @example
   * const [initDrop, dropzone] = useDrop<Item>({...})
   * <div :ref="initDrop"></div>
   *
   * @param el - The HTML element that should have drop functionality applied
   *
   * @returns The same HTML element. It useful if you want to give the element drag/drop functionality simultaneously
   * @example
   * const [initDrag, draggable] = useDrag<Item>({...})
   * const [initDrop, dropzone] = useDrop<Item>({...})
   * <div :ref="(node) => initDrop(initDrag(node))"></div>
   */
  init: (el: any) => {};

  /**
   * The state of the created dropzone in `useDrop` composable
   */
  dropzone: Dropzone;
}

/**
 * Handlers to use in defineProps' types
 * @example
 * const props = defineProps<{
 *   cell: GridCell;
 *   dropzone?: DropzoneEventHandlers<GridCell>;
 * }>();
 *
 * ...
 * props.dropzone?.handleDragStart?.(draggable);
 * ...
 */
export interface DropzoneEventHandlers<T> {
  handleDropAttempt?: (draggable: Draggable<T>) => void;
  handleFailedDrop?: (draggable: Draggable<T>) => void;
  handleSuccessfulDrop?: (draggable: Draggable<T>) => void;
}

const { addDropzone, removeDropzone } = useDragAndDropState();

export const useDrop = (dropOptions: DropOptions): [DropReturn['init'], DropReturn['dropzone']] => {
  // Set default option and merge with user-provided options
  const defaultOptions: Partial<DropOptions> = {};
  const options = { ...defaultOptions, ...dropOptions };

  // Ref for the dropzone element
  const elementRef = ref<HTMLElement | null>();

  // Init dropzone state
  const dropzone: Dropzone = {
    accepts: options.accepts,
    element: elementRef,

    enter(draggable) {
      if (this.canDrop(draggable) && options.dropZoneClass) {
        dropzone.element.value?.classList.add(options.dropZoneClass);
      }
    },

    leave(draggable) {
      if (options.dropZoneClass) {
        dropzone.element.value?.classList.remove(options.dropZoneClass);
      }
    },

    canDrop(draggable) {
      return draggable.type === dropzone.accepts;
    },

    drop(draggable) {
      this.leave(draggable);

      options.onDropAttempt?.(draggable);

      if (!this.canDrop(draggable)) {
        options.onFailedDrop?.(draggable);
        return false;
      }

      options.onSuccessfulDrop?.(draggable);
      return true;
    },
  };

  // Add and remove dropzone from the collection
  onMounted(() => addDropzone(dropzone));
  onUnmounted(() => removeDropzone(dropzone));

  // Provide the function to init drop and the dropzone state
  return [
    (el: HTMLElement) => {
      elementRef.value = el;
      return el;
    },

    dropzone,
  ];
};
