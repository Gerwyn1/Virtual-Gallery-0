import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import "react-app-polyfill/stable";
import "core-js";
import { Provider } from "react-redux";
import store from "./store.js";
import { CookiesProvider } from "react-cookie";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
     <Provider store={store}>
      <App />
    </Provider>
    </CookiesProvider>
  </React.StrictMode>,
)
