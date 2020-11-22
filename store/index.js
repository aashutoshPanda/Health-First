import { configureStore } from "@reduxjs/toolkit";
import waterLevelReducer from "./slices/waterSlice";
import cameraReducer from "./slices/cameraSlice";

export default configureStore({
  reducer: {
    waterLevel: waterLevelReducer,
    camera: cameraReducer,
  },
});
