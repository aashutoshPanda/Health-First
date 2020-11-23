import { createSlice } from "@reduxjs/toolkit";
import firebase from "../../firebase";
export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {},
  reducers: {},
});

export const { setDetails, setLoading } = appointmentSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const logInAsync = (email, password) => (dispatch) => {};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectLoading = (state) => state.appointment.loading;
export const selectIsLoggedIn = (state) => state.appointment.isLoggedIn;

export default appointmentSlice.reducer;
