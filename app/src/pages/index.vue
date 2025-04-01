<script setup lang="ts">
const { api } = useRPC();
const { data } = useAsyncData(async () => api.health.$get());
</script>
<template>
  <div>
    {{ data }}
  </div>
</template>