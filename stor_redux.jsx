import { configureStore } from '@reduxjs/toolkit';
import venueReducer from './cardslice';
import avReducer from './avSlice';
import mealsReducer from './houseSlice';

export default configureStore({
  reducer: {
    venue: venueReducer,
    av: avReducer,
    meals: mealsReducer,
  },
});
