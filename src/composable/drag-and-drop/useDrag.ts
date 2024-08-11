import { onMounted, onUnmounted, ref, toRef, watch, type MaybeRef, type Ref } from 'vue';
import { useMouse, useMousePressed } from '@vueuse/core';

import { useDragAndDropState } from './useDragAndDropState';
import type { Vector2D } from '@/types/vector-2d';
import type { Dropzone } from './useDrop';

/**
 * Draggable state
 */
export interface Draggable<T> {
  /**
   * A type of Draggable
   */
  type: string;

  /**
   * The reactive reference holding the element of the draggable
   */
  element: Ref<HTMLElement | null | undefined>;

  /**
   * The reactive reference holding the dropzone where the draggable located now
   */
  enteredDropzone: Ref<Dropzone | null | undefined>;

  /**
   * The reactive reference holding the value of the draggable
   */
  item: Ref<T>;

  /**
   * Is draggable it dragging state
   */
  isDragging: Ref<boolean>;
}

interface DragOptions<T> {
  /**
   * Type of the draggable
   */
  type: string;

  /**
   * The reactive reference holding the value of the draggable
   */
  item: MaybeRef<T>;

  /**
   * Optional delay before the drag operation starts, in milliseconds
   */
  startDelay?: number;

  /**
   * Optional class name to be added to the draggable element while it is being dragged
   */
  draggingClass?: string;

  /**
   * Optional class name to be added to the draggable cloned element while it is being dragged
   */
  draggingCloneClass?: string;

  /**
   * Optional callback function that is triggered when the drag operation starts
   * @param draggable - The draggable state that starting drag operation
   * @returns Optionally return false to prevent the default drag behavior
   */
  onDragStart?: (draggable: Draggable<T>) => void | boolean;

  /**
   * Optional callback function that is triggered when a drop attempt was made
   * @param draggable - The draggable state that tries to drop to a dropzone
   * @returns
   */
  onDropAttempt?: (draggable: Draggable<T>) => void;

  /**
   * Optional callback function that is triggered when a drop attempt was failed
   * @param draggable - The draggable state that failed to drop to a dropzone
   * @returns
   */
  onFailedDrop?: (draggable: Draggable<T>) => void;

  /**
   * Optional callback function that is triggered when a drop attempt was successful
   * @param draggable - The draggable state that dropped to a dropzone
   * @returns
   */
  onSuccessfulDrop?: (draggable: Draggable<T>) => void;
}

interface DragReturn<T> {
  /**
   * Function to be used with an HTML element's `ref` attribute to give the element drag functionality
   * @example
   * const [initDrag, draggable] = useDrag<Item>({...})
   * <div :ref="initDrag"></div>
   *
   * @param el - The HTML element that should have drag functionality applied
   *
   * @returns The same HTML element. It useful if you want to give the element drag/drop functionality simultaneously
   * @example
   * const [initDrag, draggable] = useDrag<Item>({...})
   * const [initDrop, dropzone] = useDrop<Item>({...})
   * <div :ref="(node) => initDrop(initDrag(node))"></div>
   */
  init: (el: any) => {};

  /**
   * The state of the created draggable in `useDrag` composable
   */
  draggable: Draggable<T>;
}

/**
 * Handlers to use in defineProps' types
 * @example
 * const props = defineProps<{
 *   cell: GridCell;
 *   draggable?: DraggableEventHandlers<GridCell>;
 * }>();
 * 
 * ...
 * props.draggable?.handleDragStart?.(draggable);
 * ...
 */
export interface DraggableEventHandlers<T> {
  handleDragStart?: (draggable: Draggable<T>) => boolean | void;
  handleDropAttempt?: (draggable: Draggable<T>) => void;
  handleFailedDrop?: (draggable: Draggable<T>) => void;
  handleSuccessfulDrop?: (draggable: Draggable<T>) => void;
}

const { addDraggable, removeDraggable, findDropzone } = useDragAndDropState();
const { x, y } = useMouse();

export const useDrag = <T>(
  dragOptions: DragOptions<T>,
): [DragReturn<T>['init'], DragReturn<T>['draggable']] => {
  // Set default options and merge with user-provided options
  const defaultOptions: Partial<DragOptions<T>> = {
    startDelay: 100,
  };
  const options = { ...defaultOptions, ...dragOptions };

  // Refs for the draggable element and its clone
  const elementRef = ref<HTMLElement | null>();
  const clonedElement = ref<HTMLElement | null>();

  // Init draggable state
  const draggable: Draggable<T> = {
    type: options.type,
    element: elementRef,
    enteredDropzone: ref<Dropzone>(),
    isDragging: ref(false),
    item: ref(options.item) as Ref<T>,
  };

  // Track mouse state
  const { pressed } = useMousePressed({ target: elementRef });
  const dragStartPosition = ref<Vector2D>({
    x: 0,
    y: 0,
  });
  let dragLongPressTimer: number | undefined = 0;

  /* Watch for mouse press state changes to start or end drag */
  watch(pressed, (_pressed) => (_pressed ? setTimeout(() => startDrag(), 0) : endDrag()));

  /**
   * Start the drag operation
   */
  function startDrag() {
    const pressedElement = document.elementFromPoint(x.value, y.value)!;
    const rect = pressedElement.getBoundingClientRect();

    dragStartPosition.value = {
      x: x.value - rect.x,
      y: y.value - rect.y,
    };

    dragLongPressTimer = setTimeout(() => {
      if (options.onDragStart?.(draggable) === false) return;

      draggable.isDragging.value = true;

      if (options.draggingClass) {
        elementRef.value?.classList.add(options.draggingClass);
      }

      // Create and style cloned element
      clonedElement.value = pressedElement.cloneNode(true) as HTMLElement;
      if (options.draggingCloneClass) {
        clonedElement.value.classList.add(options.draggingCloneClass);
      }

      clonedElement.value.style.cssText = `
        width: ${rect.width}px;
        height: ${rect.height}px;
        position: fixed;
        z-index: 999999;
        display: none;
        pointer-events: none;
      `;

      pressedElement.append(clonedElement.value);
    }, options.startDelay);
  }

  /**
   * End the drag operation
   */
  function endDrag() {
    clearTimeout(dragLongPressTimer);

    clonedElement.value?.remove();
    clonedElement.value = null;

    if (!draggable.isDragging.value) return;

    draggable.isDragging.value = false;

    options.onDropAttempt?.(draggable);

    if (options.draggingClass) {
      elementRef.value?.classList.remove(options.draggingClass);
    }

    if (!draggable.enteredDropzone.value) {
      options.onFailedDrop?.(draggable);
      return;
    }

    if (!draggable.enteredDropzone.value.drop?.(draggable)) {
      options.onFailedDrop?.(draggable);
      draggable.enteredDropzone.value = null;

      return;
    }

    options.onSuccessfulDrop?.(draggable);
    draggable.enteredDropzone.value = null;
  }

  /* Updated cloned element position and look for dropzones */
  watch([x, y], () => {
    if (!draggable.isDragging.value || !clonedElement.value) return;

    clonedElement.value.style.display = '';
    clonedElement.value.style.left = `${x.value - dragStartPosition.value.x}px`;
    clonedElement.value.style.top = `${y.value - dragStartPosition.value.y}px`;

    lookForDropzone();
  });

  /**
   * Check if the cloned element is over a dropzone
   * @returns
   */
  function lookForDropzone() {
    const hoveredElement = document.elementFromPoint(x.value, y.value);
    const dropzone = findDropzone((d) => d.element.value === hoveredElement);

    // If we hovered another dropzone, it means that we leaved previous dropzone
    if (
      draggable.enteredDropzone.value &&
      dropzone?.element !== draggable.enteredDropzone.value.element
    ) {
      draggable.enteredDropzone.value?.leave?.(draggable);
    }

    draggable.enteredDropzone.value = dropzone;

    // We hovered non-dropzone element
    if (!dropzone) return;

    draggable.enteredDropzone.value?.enter?.(draggable);
  }

  // Add and remove draggable from the collection
  onMounted(() => addDraggable(draggable));
  onUnmounted(() => removeDraggable(draggable));

  // Provide the function to init drag and the draggable state
  return [
    (el: HTMLElement) => {
      elementRef.value = el;
      return el;
    },

    draggable,
  ];
};
