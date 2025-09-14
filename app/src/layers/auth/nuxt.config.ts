export default defineNuxtConfig({
  components: [
    { path: './components', prefix: 'Auth' },
  ],
  imports: {
    dirs: [
      'hooks',
      'types',
      'queries',
      'stores',
    ],
  },
})