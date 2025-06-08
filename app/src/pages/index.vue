<script setup lang="ts">
const { api } = useRPC();
const { data } = useAsyncData(async () => await api.health.$get());
const auth = useAuthStore();
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    <div>
      auth status: {{ auth.fetchStatus }}
    </div>
    <div>
      health status: {{ data }}
    </div>
    <div v-if="auth.fetchStatus === 'fetching'">
      auth loading...
    </div>
    <div v-else-if="auth.fetchStatus === 'error'">
      auth error !
    </div>
    <div v-else>
      <div v-if="auth.user">
        {{ auth.user.name }} 로 로그인
      </div>
      <PrimeButton @click="$router.push('/login')">
        로그인하기
      </PrimeButton>
    </div>
  </div>
</template>