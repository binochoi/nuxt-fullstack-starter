<script setup lang="ts">
const data = await useTrpcAPI().app.getList.query();
</script>
<template>
  <div>
    zz
    {{ data }}
  </div>
</template>