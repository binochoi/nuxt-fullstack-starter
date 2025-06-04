<script setup lang="ts">
const { api } = useRPC();
const { data } = useAsyncData(async () => await api.health.$get());
</script>
<template>
  <div>
    z
    {{ data }}
  </div>
</template>