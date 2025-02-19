import { Icon } from '@iconify/vue';

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.component('Icon', Icon);
});