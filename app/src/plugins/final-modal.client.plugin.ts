import { createVfm } from 'vue-final-modal'

export default defineNuxtPlugin((nuxtApp) => {
  const vfm = createVfm() as never;

  nuxtApp.vueApp.use(vfm)
})