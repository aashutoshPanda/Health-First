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
      withId: "",
      withName: "",
      date: "",
      service: "",
      time: "",
      price: "",
    },
    servicePrice: [],
  },
  reducers: {
    addToMyAppointments: (state, action) => {
      state.myAppointments.push(action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setMyAppointments: (state, action) => {
      state.myAppointments = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAppointment: (state, action) => {
      state.selectedData.withName = action.payload.withName;
      state.selectedData.withId = action.payload.withId;
      state.selectedData.address = action.payload.address;
    },
    setAdditionalData: (state, action) => {
      state.selectedData.service = action.payload.service;
      state.selectedData.time = action.payload.time;
      state.selectedData.price = action.payload.price;
      state.selectedData.date = action.payload.date;
    },
    setServicePrice: (state, action) => {
      state.servicePrice = action.payload;
    },
    reset: (state, action) => {
      state.selectedData.address = "";
      state.selectedData.withName = "";
      state.selectedData.withId = "";
      state.selectedData.date = "";
      state.selectedData.service = "";
      state.selectedData.time = "";
      state.selectedData.price = "";
    },
  },
});

export const {
  setMyAppointments,
  setAppointment,
  setAdditionalData,
  setLoading,
  reset,
  setSearchQuery,
  setSearchData,
  setServicePrice,
  addToMyAppointments,
} = appointmentSlice.actions;

export const makeAppointmentAsync = (data) => (dispatch) => {
  // console.log("data for new appointment", data);
  dispatch(setLoading(true));
  const uid = firebase.auth().currentUser && firebase.auth().currentUser.uid;
  const db = firebase.database();
  db.ref(`appointment/${uid}/`).push(data);
  dispatch(addToMyAppointments());
};
export const getMyAppointmentsAsync = () => (dispatch) => {
  dispatch(setLoading(true));
  const id = firebase.auth().currentUser && firebase.auth().currentUser.uid;
  const db = firebase.database();
  db.ref(`appointment/${id}/`).once("value", (snapshot) => {
    // console.log("snap value : ", snapshot.val());
    const myAppointments = [];
    for (const [key, value] of Object.entries(snapshot.val())) {
      myAppointments.push(snapshot.val()[key]);
    }
    dispatch(setMyAppointments(myAppointments));
    dispatch(setLoading(false));
  });
};
export const getSearchDataAsync = () => (dispatch) => {
  dispatch(setLoading(true));
  const db = firebase.database();
  db.ref(`user/`).on("value", (snapshot) => {
    console.log("snap", snapshot.val());
    const dataAsObject = snapshot.val();
    const filteredData = [];
    for (const [key, value] of Object.entries(dataAsObject)) {
      if (dataAsObject[key]["type"] !== "patient") {
        filteredData.push({ withId: key, ...dataAsObject[key] });
      }
    }
    dispatch(setSearchData(filteredData));
    dispatch(setLoading(false));
  });
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk withId the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectMyAppointments = (state) => state.appointment.myAppointments;
export const selectLoading = (state) => state.appointment.loading;

export default appointmentSlice.reducer;
