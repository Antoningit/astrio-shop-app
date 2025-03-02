<template>
  <app-header
    ><div class="container mx-auto flex justify-between items-center">
      <div>
        <nuxt-link to="/">
          <img src="/images/logo.png" alt="" />
        </nuxt-link>
      </div>
      <NuxtLink to="/cart" class="relative flex items-center">
        <u-icon
          name="i-material-symbols:shopping-cart-outline"
          class="w-6 h-6 text-black"
        ></u-icon>
        <span
          v-if="cartStore.totalQuantity > 0"
          class="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >{{ cartStore.totalQuantity }}</span
        >
      </NuxtLink>
    </div></app-header
  >
</template>
<script setup>
import AppHeader from "./AppHeader.vue";
import { useCartStore } from "@/store/cart";
const cartStore = useCartStore();
</script>
