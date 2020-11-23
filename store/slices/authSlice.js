import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isLoggedIn: false,
    name: "",
    id: "",
    age: "",
    gender: "",
    degree: [],
    address: "",
    email: "",
  },
  reducers: {
    setDetails: (state, action) => {
      state.loading = action.payload.loading;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.name = action.payload.name;
      state.id = action.payload.id;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setDetails, setLoading } = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const logInAsync = (email, password) => (dispatch) => {
  dispatch(setLoading(true));
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const name =
        firebase.auth().currentUser && firebase.auth().currentUser.displayName;
      const id = firebase.auth().currentUser && firebase.auth().currentUser.uid;
      dispatch(setDetails({ loading: false, isLoggedIn: true, name, id }));
    })
    .catch(function (error) {
      dispatch(setLoading(false));
      console.log("Error auth Slice login", error);
    });
};
export const registerAsync = (name, type, email, password) => (dispatch) => {
  firebase.register(name, type, email, password).then((data) => {
    console.log("signup data ", data);
  });
};
export const logOutAsync = () => (dispatch) => {
  firebase.logout().then((data) => {
    console.log("log out data ", data);
  });
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectLoading = (state) => state.auth.loading;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUserId = (state) => state.auth.id;

export default authSlice.reducer;
