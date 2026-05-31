import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Reducer to handle adding an item to the cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Reducer to completely remove an item from the cart based on its name
    removeItem: (state, action) => {
      // action.payload will pass the name string directly
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // Reducer to update the quantity of a specific item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure the product name and new quantity
      // Find the item in the cart that matches the given name
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // Update its quantity to the new value
      }
    },
  },
});

// Export action creators to be dispatched in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default to configure in store.js
export default CartSlice.reducer;