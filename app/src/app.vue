<script setup lang="ts">
const data = await useTrpcAPI().app.getList.query();
</script>
<template>
  <div>
    {{ data }}
  </div>
</template>