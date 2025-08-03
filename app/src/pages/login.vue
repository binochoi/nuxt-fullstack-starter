<script setup lang="ts">
import { useAuthStore } from 'app/store/useAuthStore';

const auth = useAuthStore();
const login = (provider: 'google') => {
  return auth.client.signIn.social({
    provider,
  })
}
</script>
<template>
  <div>
    <van-nav-bar title="로그인" left-text="Back" left-arrow @click-left="$router.back()" />
    <div class="flex flex-col items-center justify-center h-screen gap-4">
      <PrimeButton variant="text" @click="login('google')">구글로 로그인</PrimeButton>
    </div>
  </div>
</template>