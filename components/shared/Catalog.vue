<template>
  <div class="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 min-h-screen">
    <sidebar
      :brands="brands"
      :selected-brand-id="selectedBrandId"
      @brand-cleared="clearBrand"
      @brand-selected="filterByBrand"
    />
    <div>
      <h2 v-if="selectedBrandId == null" class="text-lg font-bold pb-4 pt-4">
        Каталог
      </h2>
      <h2 v-else class="text-lg font-bold pb-4 pt-4">
        Выбрано: {{ selectedBrand }}
      </h2>
      <product-list :products="filteredProducts" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import Sidebar from "@/components/ui/ShopSidebar.vue";
import ProductList from "@/components/shared/ProductList";
const { data: products } = await useFetch("products.json");
const { data: brands } = await useFetch("brands.json");
const brandsMap = Object.fromEntries(
  brands.value.map((brand) => [brand.id, brand])
);
products.value = products.value.map((product) => ({
  ...product,
  brand: {
    id: product.brand,
    title: brandsMap[product.brand].title,
  },
  regular_price: {
    value: product.regular_price.value,
    currency:
      product.regular_price.currency === "USD"
        ? "$"
        : product.regular_price.currency,
  },
}));
const selectedBrandId = ref(null);
const filteredProducts = computed(() => {
  if (!selectedBrandId.value) return products.value;
  return products.value.filter(
    (product) => product.brand.id === selectedBrandId.value
  );
});
const selectedBrand = computed(() => brandsMap[selectedBrandId.value].title);
const filterByBrand = (brandId) => {
  selectedBrandId.value = brandId;
};
const clearBrand = () => (selectedBrandId.value = null);
</script>
