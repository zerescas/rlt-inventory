<script setup lang="ts">
import InventorySidePanelSkeleton from './components/InventorySidePanelSkeleton.vue';
import InventoryGrid from './components/InventoryGrid.vue';
import InventoryFooterSkeleton from './components/InventoryFooterSkeleton.vue';
import { useThemeStore } from './stores/useThemeStore';
import { toRefs } from 'vue';

const { stateString, next } = toRefs(useThemeStore());
</script>

<template>
  <div class="app-layout">
    <div class="inventory">
      <InventorySidePanelSkeleton style="grid-area: inventory-sidepanel" />
      <InventoryGrid style="grid-area: inventory-grid" />
      <InventoryFooterSkeleton style="grid-area: inventory-footer" />
      
      <div style="grid-area: inventory-footer-2">
        <button class="button button-primary" @click="next()">
          {{ stateString }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  margin: auto;
}

.inventory {
  display: grid;
  gap: 24px;
  grid-template: 500px 72px / 236px 525px;
  grid-template-areas:
    'inventory-sidepanel inventory-grid'
    'inventory-footer    inventory-footer'
    'inventory-footer-2  inventory-footer-2';
  height: 100%;
  width: 100%;
}
</style>
