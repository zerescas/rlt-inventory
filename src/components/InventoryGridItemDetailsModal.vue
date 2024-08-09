<script setup lang="ts">
import { ref, type PropType } from 'vue';
import type { GridCell } from '@/types/inventory/grid-cell';
import { useInventoryItemDetailStore } from '@/stores/inventoryItemDetail';
import AnimatedPlaceholder from './AnimatedPlaceholder.vue';
import IconClose from './icons/IconClose.vue';

const inventoryItemDetailStore = useInventoryItemDetailStore();

const props = defineProps({
  cell: {
    type: Object as PropType<GridCell>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'deleteItem', cell: GridCell, count: number): void;
  (e: 'unSelectItem'): void;
}>();

const isShowDeleteConfirm = ref(false);
const countToDelete = ref<number | string>('');

function deleteItem() {
  if (+countToDelete.value <= 0) return;

  emit('deleteItem', props.cell, +countToDelete.value);

  isShowDeleteConfirm.value = false;
  countToDelete.value = '';
}
</script>

<template>
  <div class="inventory-grid-item-details-modal">
    <button class="icon-button card-close-button" @click="emit('unSelectItem')">
      <IconClose />
    </button>

    <div class="header">
      <img class="item-image" :src="inventoryItemDetailStore.getImageByCode(cell.item!.code)" />
    </div>

    <div class="content skeleton">
      <h2 class="item-title">
        <AnimatedPlaceholder height="30px" width="100%" borderRadius="8px" />
      </h2>

      <p class="item-description">
        <AnimatedPlaceholder height="10px" width="100%" />
        <AnimatedPlaceholder height="10px" width="100%" />
        <AnimatedPlaceholder height="10px" width="100%" />
        <AnimatedPlaceholder height="10px" width="85%" />
        <AnimatedPlaceholder height="10px" width="40%" />
      </p>
    </div>

    <div class="footer">
      <button class="button button-primary button-size-m" @click="isShowDeleteConfirm = true">
        Удалить предмет
      </button>

      <Transition name="slide-from-bottom">
        <div v-if="isShowDeleteConfirm" class="delete-confirmation-card">
          <input class="input" v-model="countToDelete" placeholder="Введите количество" />

          <div class="buttons">
            <button class="button button" @click="isShowDeleteConfirm = false">Отмена</button>
            <button class="button button-primary" @click="deleteItem">Подтвердить</button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
