import {
  handleDragstart as _handleDragstart,
  handleTouchstart as _handleTouchstart,
  type NodeDragEventData,
  type NodeTouchEventData,
  type NodeTargetData,
} from '@formkit/drag-and-drop';

type Condition<T> = (targetData: NodeTargetData<T>) => boolean;

export const usePreventDrag = <T>(...conditions: Condition<T>[]) => {
  function shouldPrevent(targetData: NodeTargetData<T>) {
    return conditions.some((condition) => condition(targetData));
  }

  function handleDragstart(eventData: NodeDragEventData<T>) {
    if (shouldPrevent(eventData.targetData)) {
      eventData.e.preventDefault();
      return;
    }

    _handleDragstart(eventData);
  }

  function handleTouchstart(eventData: NodeTouchEventData<T>) {
    if (shouldPrevent(eventData.targetData)) {
      eventData.e.preventDefault();
      return;
    }

    _handleTouchstart(eventData);
  }

  return { handleDragstart, handleTouchstart };
};
