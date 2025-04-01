import { Icon } from '@iconify/vue';
import '@types/navermaps';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Icon: Icon,
  }
}
export {};
