import { createStore } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  mode: 'light', // New state for light mode/dark mode
  userId : '63701cc1f03239b7f700000e'
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//       case 'toggleDarkMode':
//       return { ...state, darkMode: !state.darkMode }; // Toggle dark mode
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store