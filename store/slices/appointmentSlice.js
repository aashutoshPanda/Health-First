import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";
export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    myAppointments: [],
    loading: false,
    searchQuery: "",
    searchData: [],
    selectedData: {
      address: "",
      with: "",
      date: "",
      reason: "",
      time: "",
      price: "",
    },
  },
  reducers: {
    setMyAppointments: (state, action) => {
      state.myAppointments.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAppointment: (state, action) => {
      state.selectedData.with = action.payload.with;
      state.selectedData.address = action.payload.address;
    },
    setAdditionalData: (state, action) => {
      state.selectedData.reason = action.payload.reason;
      state.selectedData.time = action.payload.time;
      state.selectedData.price = action.payload.price;
      state.selectedData.date = action.payload.date;
    },
    reset: (state, action) => {
      state.selectedData.address = "";
      state.selectedData.with = "";
      state.selectedData.date = "";
      state.selectedData.reason = "";
      state.selectedData.time = "";
      state.selectedData.price = "";
    },
  },
});
export const getMyAppointmentsAsync = (id) => (dispatch) => {
  dispatch(setLoading(true));
  const db = firebase.database();
  db.ref(`appointment/${id}/`).on("value", (snapshot) => {
    dispatch(setMyAppointments(snapshot.val()));
    dispatch(setLoading(false));
  });
};
export const getSearchDataAsync = () => (dispatch) => {
  dispatch(setLoading(true));
  const db = firebase.database();
  db.ref(`user/`).on("value", (snapshot) => {
    const data = snapshot.val().filter((ele) => ele.type !== "patient");
    dispatch(setMyAppointments(data));
    dispatch(setLoading(false));
  });
};
export const {
  setMyAppointments,
  setAppointment,
  setLoading,
  reset,
} = appointmentSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectMyAppointments = (state) => state.appointment.myAppointments;
export const selectLoading = (state) => state.appointment.loading;

export default appointmentSlice.reducer;
