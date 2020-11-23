import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  imageTaken: false,
  imagePath: "",
  loading: false,
  result: null,
  showUploadButtons: true,
  error: false,
};
export const cameraSlice = createSlice({
  name: "camera",
  initialState: INITIAL_STATE,
  reducers: {
    setImageTaken: (state, action) => {
      state.imageTaken = action.payload;
    },
    setImagePath: (state, action) => {
      state.imagePath = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setShowUploadButtons: (state, action) => {
      state.showUploadButtons = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    reset: (state, action) => {
      state.imageTaken = false;
      state.imagePath = "";
      state.loading = false;
      state.result = null;
      state.showUploadButtons = true;
      state.error = false;
    },
  },
});

export const {
  setImageTaken,
  setImagePath,
  setLoading,
  setResult,
  setShowUploadButtons,
  setError,
  reset,
} = cameraSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default cameraSlice.reducer;
