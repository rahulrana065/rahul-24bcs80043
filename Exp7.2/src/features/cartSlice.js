import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      item ? item.qty++ : state.push({ ...action.payload, qty: 1 });
    },
    removeItem: (state, action) => state.filter(i => i.id !== action.payload),
    increase: (state, action) => { const i = state.find(x => x.id === action.payload); i.qty++; },
    decrease: (state, action) => { const i = state.find(x => x.id === action.payload); if (i.qty > 1) i.qty--; },
  },
});

export const { addItem, removeItem, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;
