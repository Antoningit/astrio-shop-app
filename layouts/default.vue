<template>
  <div class="flex flex-col min-h-screen">
    <shop-header></shop-header>
    <main class="container mx-auto p-4 flex-grow">
      <slot />
    </main>
    <shop-footer></shop-footer>
  </div>
</template>
<script setup>
import ShopHeader from "@/components/ui/ShopHeader.vue";
import ShopFooter from "~/components/ui/ShopFooter.vue";
</script>
