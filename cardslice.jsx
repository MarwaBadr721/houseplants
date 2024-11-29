
import { createSlice } from '@reduxjs/toolkit';
export const housesSlice = createSlice({
  name: 'houses',
  initialState: [
    { name: 'Breakfast', cost: 50, selected: false },
{ name: 'High Tea', cost: 25, selected: false },
{ name: 'Lunch', cost: 65, selected: false },
{ name: 'Dinner', cost: 70, selected: false },
   
  ],
  reducers: {
    togglehouseSelection: (state, action) => {
        state[action.payload].selected = !state[action.payload].selected;
  },
  },
});

export const { togglehouseSelection } = housesSlice.actions;
export default housesSlice.reducer;
