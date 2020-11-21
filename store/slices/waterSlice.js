import { createSlice } from "@reduxjs/toolkit";

export const waterLevelSlice = createSlice({
  name: "waterLevel",
  initialState: {
    level: 5,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.level += action.payload;
    },
  },
});

export const { incrementByAmount } = waterLevelSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  dispatch(incrementByAmount(amount));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLevel = (state) => state.waterLevel.level;

export default waterLevelSlice.reducer;
