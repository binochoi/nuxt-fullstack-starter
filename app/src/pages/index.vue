<script setup lang="ts">
const { api } = useRPC();
const { data } = useAsyncData(async () => await api.health.$get());
const auth = useAuthStore();
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    {{ auth.fetchStatus }}
    {{ data }}
    <PrimeButton @click="$router.push('/login')">
      로그인하기
    </PrimeButton>
  </div>
</template>