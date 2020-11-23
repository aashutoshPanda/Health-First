import { createSlice } from "@reduxjs/toolkit";
import firebase from "../../firebase";
export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    journals: [],
  },
  reducers: {
    addEntry: (state, action) => {
      state.journals.push(action.payload);
    },
  },
});

export const { addEntry } = journalSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const addEntryAsync = (id, rating, content, date) => (dispatch) => {
  firebase.updateJournalLog(rating, content, date).then((data) => {
    console.log("added to add entry fucntion data ", data);
    // dispatch(addEntry({ content, date, id, rating }));
  });
};
export const getJournalsAsync = () => (dispatch) => {
  console.log("get journals async redux called");
  firebase.getJournals().then(() => {
    console.log("then of get journals");
  });
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectJournals = (state) => state.journal.journals;

export default journalSlice.reducer;
