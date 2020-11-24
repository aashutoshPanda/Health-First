import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./slices/appointmentSlice";
import waterLevelReducer from "./slices/waterSlice";
import cameraReducer from "./slices/cameraSlice";
import authReducer from "./slices/authSlice";
import journalReducer from "./slices/journalSlice";

export default configureStore({
  reducer: {
    waterLevel: waterLevelReducer,
    camera: cameraReducer,
    auth: authReducer,
    journal: journalReducer,
    appointment: appointmentReducer,
  },
});
