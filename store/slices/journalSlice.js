import { createSlice } from "@reduxjs/toolkit";
import * as firebase from "firebase";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    journals: {},
  },
  reducers: {
    addEntry: (state, action) => {
      state.journals = action.payload;
    },
  },
});

export const { addEntry } = journalSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const addEntryAsync = (id, rating, content, date) => (dispatch) => {
  console.log("entries", id, rating, content, date);
  const db = firebase.database();
  db.ref(`journal/${id}/${date}`)
    .set({ rating, content, date })
    .then((date) => {
      console.log("resp", data);
    });
};
export const getJournalsAsync = (id) => (dispatch) => {
  const db = firebase.database();
  db.ref(`journal/${id}`).on("value", (snapshot) => {
    dispatch(addEntry(snapshot.val()));
  });
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectJournals = (state) => state.journal.journals;

export default journalSlice.reducer;
