import { readonly, ref, watchEffect } from 'vue';
import { useColorMode, useCycleList } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', () => {
  const mode = useColorMode();
  const { state, next } = useCycleList(['dark', 'light', 'auto'] as const, { initialValue: mode });
  const stateString = ref('');

  watchEffect(() => (mode.value = state.value));

  watchEffect(() => {
    switch (state.value) {
      case 'light':
        stateString.value = 'Светлая тема';
        break;

      case 'dark':
        stateString.value = 'Тёмная тема';
        break;

      case 'auto':
        stateString.value = 'Системная тема';
        break;
    }
  });

  return { mode: readonly(mode), state: readonly(state), stateString: readonly(stateString), next };
});
