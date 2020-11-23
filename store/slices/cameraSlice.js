import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    imageTaken: false,
    imageUrl: "",
    laoding: false,
    result: true,
    showUploadButtons: true,
  },
  reducers: {
    setImageTaken: (state, action) => {
      state.imageTaken = action.payload;
    },
    setImageUrl: (state, action) => {
      state.ImageUrl = action.payload;
    },
    apiResponseUrl: (state, action) => {
      state.ImageUrl = action.payload;
    },
    apiRequestWait: (state, action) => {
      state.ImageUrl = action.payload;
    },
    apiRequestSuccess: (state, action) => {
      state.ImageUrl = action.payload;
    },
  },
});

export const {
  setImageTaken,
  setImageUrl,
  apiResponseUrl,
  apiRequestWait,
  apiRequestSuccess,
} = cameraSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const apiRequestAsync = (pictureuri) => (dispatch) => {
  let apiUrl = "http://127.0.0.1:5000/detect";

  var data = new FormData();
  data.append("file", {
    uri: pictureuri,
    name: "imageFromApp.jpg",
    type: "image/jpg",
  });

  fetch(apiUrl, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    body: data,
  })
    .then((response) => {
      console.log("succ from cataract ");
      console.log(response);
    })
    .catch((err) => {
      console.log("err from cataract");
      console.log(err);
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectImageTaken = (state) => state.camera.imageTaken;
export const selectImageUrl = (state) => state.camera.ImageUrl;
export const selectApiResponseUrl = (state) => state.camera.apiResponseUrl;
export const selectApiRequestWait = (state) => state.camera.apiRequestWait;
export const selectApiRequestSuccess = (state) =>
  state.camera.apiRequestSuccess;

export default cameraSlice.reducer;
