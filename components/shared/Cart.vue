<template>
  <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md">
    <div v-if="cartItems.length > 0">
      <h1
        class="pb-4 pt-4 text-lg sm:text-xl font-bold text-center sm:text-left"
      >
        Корзина
      </h1>

      <div
        class="hidden sm:grid grid-cols-[3fr_1fr_1fr_1fr_0.5fr] gap-4 border-b pb-2 font-semibold"
      >
        <span>Товар</span>
        <span class="text-right">Цена</span>
        <span class="text-center">Кол-во</span>
        <span class="text-right">Всего</span>
        <span></span>
      </div>

      <cart-item
        v-for="product in cartItems"
        :product="product"
        :key="product.id"
        class="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr_1fr_0.5fr] gap-4 items-center border-b py-4"
        @product-removed="removeProduct"
        @update:quantity="updateQuantity"
      >
      </cart-item>

      <div class="flex flex-col items-center sm:items-end mt-6">
        <span class="text-lg sm:text-xl font-semibold pb-3">
          Итого: ${{ subtotal.toFixed(2) }}
        </span>
        <button
          class="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 w-full sm:w-auto"
        >
          Оформление заказа
        </button>
      </div>
    </div>

    <div v-else class="text-center">
      <h1 class="pb-4 pt-4 text-lg sm:text-xl font-bold">Ваша корзина пуста</h1>
      <p class="text-gray-600">Добавьте что-то</p>
      <nuxt-link
        to="/"
        class="border-b border-black border-dashed mt-2 inline-block"
      >
        За покупками
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/store/cart";
import CartItem from "@/components/shared/CartItem.vue";
const cartStore = useCartStore();
const toast = useToast();
const cartItems = computed(() => cartStore.items);
const subtotal = computed(() =>
  cartStore.items.reduce(
    (sum, product) => sum + product.regular_price.value * product.quantity,
    0
  )
);
const removeProduct = (product) => {
  cartStore.removeFromCart(product.id);
  toast.add({
    title: `Вы удалили ${product.title} ${
      product?.options?.color?.label != null
        ? `Цвет: ${product?.options?.color?.label}`
        : ""
    } ${
      product?.options?.size?.label != null
        ? `Размер: ${product?.options?.size?.label}`
        : ""
    }`,
    timeout: 1000,
  });
};
const updateQuantity = ({ quantity, productId }) => {
  cartStore.updateQuantity(quantity, productId);
};
</script>
