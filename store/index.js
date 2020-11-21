import { configureStore } from "@reduxjs/toolkit";
import waterLevelReducer from "./slices/waterSlice";

export default configureStore({
  reducer: {
    waterLevel: waterLevelReducer,
  },
});
