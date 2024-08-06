<script setup lang="ts">
import InventorySidePanelSkeleton from './components/InventorySidePanelSkeleton.vue'
import InventoryFooterSkeleton from './components/InventoryFooterSkeleton.vue'
</script>

<template>
  <div class="app-layout">
    <div class="inventory">
      <InventorySidePanelSkeleton style="grid-area: inventory-sidepanel" />
      <InventoryFooterSkeleton style="grid-area: inventory-footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  margin: auto;
}

.inventory {
  display: grid;
  gap: var(--theme-gap-layout);
  grid-template: 500px 72px / 236px 525px;
  grid-template-areas:
    'inventory-sidepanel inventory-grid'
    'inventory-footer    inventory-footer';
  height: 100%;
  width: 100%;
}
</style>
