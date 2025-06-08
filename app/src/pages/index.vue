<script setup lang="ts">
const { api } = useRPC();
const { data } = useAsyncData(async () => await api.health.$get());
const auth = useAuthStore();
console.log('sival')
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen gap-4">
    <div>
      auth status: {{ auth.status }}
    </div>
    <div>
      health status: {{ data }}
    </div>
    <div v-if="auth.status === 'loading'">
      auth loading...
    </div>
    <div v-else-if="auth.status === 'error'">
      auth error !
    </div>
    <div v-else>
      <div v-if="auth.user">
        {{ auth.user.name }} 로 로그인
        <PrimeButton @click="auth.signOut()">
          로그아웃
        </PrimeButton>
      </div>
      <PrimeButton v-else @click="$router.push('/login')">
        로그인하기
      </PrimeButton>
    </div>
  </div>
</template>