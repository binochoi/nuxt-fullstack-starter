<script setup lang="ts">
import { useAuthStore } from 'app/store/useAuthStore';

const auth = useAuthStore();
const form = reactive({
  email: '',
  password: '',
});
const login = () => {
  return auth.client.signIn.email(form);
}
</script>
<template>
  <div>
    <van-nav-bar title="로그인" left-text="Back" left-arrow @click-left="$router.back()" />
    <div class="flex flex-col items-center justify-center h-screen gap-4">
      <form @submit.prevent="login" class="flex flex-col gap-2">
        <PrimeInputText v-model="form.email" />
        <PrimeInputText v-model="form.password" />
        <PrimeButton variant="text" @click="login">로그인</PrimeButton>
      </form>
    </div>
  </div>
</template>