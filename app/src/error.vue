<script setup lang="ts">
const props = defineProps({
  error: Object
});

const errorTitle = computed(() => {
  switch (props.error?.statusCode) {
    case 404:
      return '페이지를 찾을 수 없습니다';
    case 403:
      return '접근 권한이 없습니다';
    case 500:
      return '서버 오류가 발생했습니다';
    default:
      return '오류가 발생했습니다';
  }
});

const errorDescription = computed(() => {
  switch (props.error?.statusCode) {
    case 404:
      return '요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다';
    case 403:
      return '해당 페이지에 접근할 권한이 없습니다';
    case 500:
      return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요';
    default:
      return '알 수 없는 오류가 발생했습니다';
  }
});
</script>

<template>
  <main
    :class="[
      'grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8',
      'animate-in fade-in slide-in-from-top-3 duration-500 ease-out fill-mode-backwards'
    ]"
  >
    <div class="text-center">
      <p class="text-base font-semibold text-primary-600">
        {{ error?.statusCode || 'Error' }}
      </p>
      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        {{ errorTitle }}
      </h1>
      <div class="animate-in fade-in slide-in-from-top-3 duration-500 ease-out fill-mode-backwards delay-500">
        <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          {{ errorDescription }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <button
            class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            @click="$router.replace('/')"
          >
            홈으로 돌아가기
          </button>
          <button
            class="text-sm font-semibold text-gray-900"
            @click="$router.back()"
          >
            이전 페이지 <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>