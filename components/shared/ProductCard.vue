<template>
  <u-card :ui="{ body: { padding: 'p-0 sm:p-0' } }">
    <img
      :src="selectedOptionImage"
      alt=""
      class="w-full max-h-[220px] object-contain sm:max-h-none"
    />
    <div class="p-4">
      <h3 class="text-lg font-bold">{{ product.title }}</h3>
      <div>
        <div class="text-gray-700">{{ product.brand.title }}</div>
        <span class="text-gray-700"
          >Цена: {{ product.regular_price.currency }}</span
        >
        <span class="text-gray-700"> {{ product.regular_price.value }}</span>
      </div>
      <div v-if="product.type === PRODUCT_TYPE_CONFIGURABLE" class="mt-2">
        <div
          v-for="option in product.configurable_options"
          :key="option.attribute_id"
        >
          <label class="font-medium">{{ option.label }}:</label>
          <div class="flex space-x-2 mt-1">
            <label
              v-for="value in option.values"
              :key="value.value_index"
              class="cursor-pointer"
            >
              <input
                type="radio"
                :name="option.attribute_code"
                :value="value.value_index"
                v-model="selectedOptions[option.attribute_code]"
                @change="updateVariant"
                class="hidden"
              />
              <div
                v-if="option.attribute_code === 'color'"
                class="w-8 h-8 rounded-full border-2"
                :style="{ backgroundColor: value.label }"
                :class="{
                  'border-black':
                    selectedOptions[option.attribute_code] ===
                    value.value_index,
                  'border-gray-300':
                    selectedOptions[option.attribute_code] !==
                    value.value_index,
                }"
              ></div>
              <div
                v-else
                class="px-3 py-1 border rounded-lg text-center text-sm font-medium"
                :class="{
                  'border-black bg-gray-200':
                    selectedOptions[option.attribute_code] ===
                    value.value_index,
                  'border-gray-300 bg-white':
                    selectedOptions[option.attribute_code] !==
                    value.value_index,
                }"
              >
                {{ value.label }}
              </div>
            </label>
          </div>
        </div>
      </div>
      <button
        :disabled="isDisabledProductBtn"
        @click="onAddToCart(product)"
        class="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
        :class="buttonClasses"
      >
        Добавить в корзину
      </button>
    </div>
  </u-card>
</template>
<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/store/cart";
const PRODUCT_TYPE_CONFIGURABLE = "configurable";
const cartStore = useCartStore();
const toast = useToast();
const props = defineProps({
  product: Object,
});
const selectedOptions = ref({});
const selectedOptionImage = ref(props.product.image);
const selectedVariant = computed(() => {
  return props.product.variants?.find((variant) =>
    variant.attributes.every(
      (attr) => selectedOptions.value[attr.code] === attr.value_index
    )
  );
});
const isProductConfigurable = computed(
  () => props.product.type === PRODUCT_TYPE_CONFIGURABLE
);
const isDisabledProductBtn = computed(
  () => isProductConfigurable.value && !selectedVariant.value
);
const buttonClasses = computed(() =>
  isDisabledProductBtn.value ? "disabled:opacity-15" : "hover:bg-blue-700"
);
const findOptionLabel = (optionType, optionId) => {
  if (props.product.configurable_options == null) {
    return null;
  }
  const option = props.product.configurable_options.find(
    (opt) => opt.attribute_code === optionType
  );
  return option
    ? option.values.find((v) => v.value_index === optionId)?.label
    : null;
};
const resolveFormattedOptions = () => {
  if (props.product.configurable_options == null) {
    return null;
  }
  return {
    color: {
      id: selectedOptions.value.color,
      label: findOptionLabel("color", selectedOptions.value.color),
    },
    size: {
      id: selectedOptions.value.size,
      label: findOptionLabel("size", selectedOptions.value.size),
    },
  };
};
const generateCartItemId = (product, options) => {
  return isProductConfigurable.value
    ? `${product.id}-${options.color?.id || "no-color"}-${
        options.size?.id || "no-size"
      }`
    : product.id;
};
const updateVariant = () => {
  selectedOptionImage.value = selectedVariant.value
    ? selectedVariant.value.product.image
    : props.product.image;
};
const onAddToCart = (product) => {
  const formattedOptions = resolveFormattedOptions();
  const cartItemId = generateCartItemId(product, formattedOptions);
  cartStore.addToCart({
    ...product,
    id: cartItemId,
    image: selectedVariant.value
      ? selectedVariant.value.product.image
      : props.product.image,
    options: formattedOptions ?? null,
  });
  toast.add({
    title: `Вы добавили ${product.title} в корзину`,
    timeout: 1000,
  });
};
</script>
