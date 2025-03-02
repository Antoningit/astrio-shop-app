<template>
  <div>
    <aside class="p-4 bg-gray-100 rounded-lg shadow-md">
      <div class="flex justify-between mb-2">
        <h2 class="text-lg font-bold">Бренды</h2>
        <button
          v-if="selectedBrandId != null"
          class="cursor-pointer hover:text-gray-500"
          @click="onBrandClear"
        >
          <u-icon name="i-material-symbols:close"></u-icon>
        </button>
      </div>
      <ul>
        <li
          v-for="brand in brands"
          :key="brand"
          class="py-1 px-2 mb-2 rounded cursor-pointer hover:bg-gray-200"
          :class="resolveBrandSelectedClass(brand.id)"
          @click="onBrandSelect(brand.id)"
        >
          {{ brand.title }}
        </li>
      </ul>
    </aside>
  </div>
</template>
<script setup>
const props = defineProps({
  brands: Array,
  selectedBrandId: Number,
});
const emit = defineEmits(["brand-selected", "brand-cleared"]);
const onBrandSelect = (id) => emit("brand-selected", id);
const onBrandClear = () => emit("brand-cleared");
const resolveBrandSelectedClass = (id) =>
  id === props.selectedBrandId ? "bg-gray-200" : "bg-white";
</script>
