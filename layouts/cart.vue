<template>
  <div class="flex flex-col min-h-screen">
    <cart-header></cart-header>
    <main class="container mx-auto p-4 flex-grow">
      <slot />
    </main>
    <shop-footer></shop-footer>
  </div>
</template>
<script setup>
import CartHeader from "@/components/ui/CartHeader.vue";
import ShopFooter from "~/components/ui/ShopFooter.vue";
</script>
