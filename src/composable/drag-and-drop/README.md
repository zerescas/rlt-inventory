# Yet Another Vue Drag-and-Drop (YAVDnD) 

## Description
Drag and Drop implementation without relying on horrible native HTML

It consist of three composables:
  - **useDrag** / **useDrop** - provides to any HTML element drag / drop functionality. Can be used together
  - **useDragAndDropState** - tracks **Draggables** and **Dropzones** created with the previous composables 

## How to use

  1. Import **useDrag** / **useDrop** 
  2. Provide required options (**type**, **item**) and get [**initDrag**, **draggable**] / [**initDrop**, **dropzone**] 
  3. Use **initDrag** / **initDrop** as a HTML element's **:ref**

```
<script setup lang="ts">
...

const props = defineProps<{
  cell: GridCell;
  draggable?: DraggableEventHandlers<GridCell>;
  dropzone?: DropzoneEventHandlers<GridCell>;
}>();

const [initDrag, draggable] = useDrag<GridCell>({
  type: 'card',
  item: props.cell,

  draggingCloneClass: 'dragging',

  onDragStart: (draggable) => props.draggable?.handleDragStart?.(draggable),
  onSuccessfulDrop: (draggable) => props.draggable?.handleSuccessfulDrop?.(draggable),
});
</script>

<template>
  <div :ref="initDrag"></div>
</template>
```

### Warning
It can be used only on HTML element, not nested Vue component:

**Good**
```
<div :ref="initDrag"></div>
```

**Bad**
```
<MyComponent :ref="initDrag"/>
```

### Drag + Drop

1. Use **useDrag** + **useDrop**
2. Wrap **initDrag** within **initDrop** in a HTML element's **:ref**

```
<script setup lang="ts">
...

const props = defineProps<{
  cell: GridCell;
  draggable?: DraggableEventHandlers<GridCell>;
  dropzone?: DropzoneEventHandlers<GridCell>;
}>();

const [initDrag, draggable] = useDrag<GridCell>({
  type: 'card',
  item: props.cell,

  draggingCloneClass: 'dragging',

  onDragStart: (draggable) => props.draggable?.handleDragStart?.(draggable),
  onSuccessfulDrop: (draggable) => props.draggable?.handleSuccessfulDrop?.(draggable),
});

const [initDrop, dropzone] = useDrop({
  accepts: 'card',
  dropZoneClass: 'dropzone',

  onSuccessfulDrop(draggable: Draggable<GridCell>) {
    [props.cell.item, draggable.item.value.item] = [draggable.item.value.item, props.cell.item];
  },
});
</script>

<template>
  <div :ref="(node) => initDrop(initDrag(node))"></div>
</template>
```

### Customization

You can customize **useDrag** / **useDrop**  behaviour with it options. 
Check **DragOptions** type definition: 
```
...
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
...
```

and **DropOptions** :
```
...
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
...
```

## Fin

Made by **zerescas**