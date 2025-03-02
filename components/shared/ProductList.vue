<template>
  <div>
    <div
      class="grid grid-cols-[repeat(auto-fit,minmax(1fr,300px))] grid-rows-[minmax(200px,auto)] gap-4 md:grid-cols-[repeat(auto-fit,minmax(200px,220px))]"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
<script setup>
import ProductCard from "@/components/shared/ProductCard.vue";

defineProps({
  products: Array,
});
</script>
