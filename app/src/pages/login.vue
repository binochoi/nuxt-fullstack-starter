<script setup lang="ts">
const auth = useAuthStore();
const form = reactive({
  email: '',
  password: '',
});
const login = () => {
  return auth.client.signIn.social({
    provider: 'google',
  })
}
</script>
<template>
  <div>
    <div class="flex flex-col items-center justify-center h-screen gap-4">
      <form @submit.prevent="login" class="flex flex-col gap-2">
        <PrimeInputText v-model="form.email" />
        <PrimeInputText v-model="form.password" />
        <PrimeButton variant="text" @click="login">로그인</PrimeButton>
      </form>
    </div>
  </div>
</template>