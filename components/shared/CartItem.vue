<template>
  <div>
    <div class="flex items-center">
      <img
        :src="product.image"
        alt="product"
        class="w-16 h-16 object-cover mr-4"
      />
      <div>
        <span>{{ product.brand.title }} / {{ product.title }}</span>
        <div v-if="product.options" class="text-gray-600 text-sm mt-2">
          <div>Цвет: {{ product.options.color.label }}</div>
          <div>Размер: {{ product.options.size.label }}</div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <span class="text-gray-700"
        >Цена: {{ product.regular_price.currency }}</span
      >
      <span class="text-gray-700"> {{ product.regular_price.value }}</span>
    </div>
    <div class="text-center">
      <input
        type="number"
        v-model.number="product.quantity"
        min="1"
        class="w-12 border rounded text-center"
        @change="validateValue"
      />
    </div>
    <div class="text-right">
      ${{ (product.regular_price.value * product.quantity).toFixed(2) }}
    </div>
    <div class="text-center">
      <button @click="removeproduct(product)" class="text-red-500">
        <u-icon name="i-ic:twotone-delete"></u-icon>
      </button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  product: Object,
});
const emit = defineEmits(["product-removed", "update:quantity"]);
const removeproduct = (product) => emit("product-removed", product);
const localQuantity = ref(props.product.quantity);

const validateValue = () => {
  if (localQuantity.value <= 0) {
    localQuantity.value = 1;
  }
  emit("update:quantity", {
    quantity: localQuantity.value,
    productId: props.product.id,
  });
};
</script>
