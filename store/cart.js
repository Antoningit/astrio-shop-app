import { defineStore } from "pinia";
export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    totalQuantity: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
  },
  actions: {
    addToCart(product) {
      const item = this.items.find((item) => item.id === product.id);
      if (item != null) {
        item.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
    },
    updateQuantity({ productId, quantity }) {
      const item = this.items.find((item) => item.id === productId);
      if (item != null) {
        item.quantity = quantity;
      }
    },
  },
});
