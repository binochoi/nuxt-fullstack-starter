import { Icon } from '@iconify/vue';
import '@types/navermaps';

declare module 'vue' {
  export interface GlobalComponents {
    Icon: Icon,
  }
}
export { };
