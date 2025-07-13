<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';
</script>
<template>
  <VueFinalModal v-bind="{
    overlayTransition: 'vfm-fade',
    contentTransition: 'vfm-slide-up',
  }" class="flex justify-center items-center"
    content-class="max-w-full mx-4 bg-white rounded-lg space-y-2 overflow-hidden">
    <slot></slot>
  </VueFinalModal>
</template>