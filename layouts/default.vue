<template>
  <slot />
</template>

<!-- header #01143f -->
<!-- header-text #589fe7 -->

<script setup></script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
