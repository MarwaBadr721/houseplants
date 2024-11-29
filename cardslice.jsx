
import { createSlice } from '@reduxjs/toolkit';
export const housesSlice = createSlice({
  name: 'houses',
  initialState: [
    { name: 'one', cost: 50000, selected: false },
{ name: 'two', cost: 25000, selected: false },
{ name: 'three', cost: 65000, selected: false },
{ name: 'four', cost: 70000, selected: false },
    { name: 'five', cost: 70000, selected: false },
    { name: 'six', cost: 70000, selected: false },
   
  ],
  reducers: {
    togglehouseSelection: (state, action) => {
        state[action.payload].selected = !state[action.payload].selected;
  },
  },
});

export const { togglehouseSelection } = housesSlice.actions;
export default housesSlice.reducer;
