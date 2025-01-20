// store/deleteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for Item
interface Item {
  id: number;
  name: string;
}

// Define initial state
interface DeleteState {
  items: Item[];
}

const initialState: DeleteState = {
  items: [],
};

// Create deleteSlice
const deleteSlice = createSlice({
  name: 'delete',
  initialState,
  reducers: {
    // Add an item to the list
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    // Delete an item from the list by its id
    deleteItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// Export actions and reducer
export const { addItem, deleteItem } = deleteSlice.actions;
export default deleteSlice.reducer;
