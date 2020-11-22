import { configureStore } from "@reduxjs/toolkit";
import waterLevelReducer from "./slices/waterSlice";
import cameraReducer from "./slices/cameraSlice";
import authReducer from "./slices/authSlice";

export default configureStore({
  reducer: {
    waterLevel: waterLevelReducer,
    camera: cameraReducer,
    auth: authReducer,
  },
});
