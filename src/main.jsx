import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import "react-app-polyfill/stable";
import "core-js";
import { Provider } from "react-redux";
import store from "./store.js";
import { CookiesProvider } from "react-cookie";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";

// const store = configureStore({
//   reducer: {
//     global: globalReducer,
//     [api.reducerPath]: api.reducer,
//   },
//   middleware: (getDefault) => getDefault().concat(api.middleware),
// });
// setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
     <Provider store={store}>
      <App />
    </Provider>
    </CookiesProvider>
  </React.StrictMode>,
)