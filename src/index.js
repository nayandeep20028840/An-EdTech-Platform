// Importing React to create and use React components
import React from "react";
// Importing ReactDOM for rendering React components into the DOM
import ReactDOM from "react-dom/client";
// Importing the main application component
import App from "./App";

// Importing BrowserRouter from React Router to enable client-side routing
import { BrowserRouter } from "react-router-dom";
// Importing Toaster from react-hot-toast to show toast notifications in the application
import { Toaster } from "react-hot-toast";

// Importing Provider from React Redux to integrate the Redux store with the React app
import { Provider } from "react-redux";
// Importing configureStore from Redux Toolkit to create the Redux store
import { configureStore } from "@reduxjs/toolkit";
// Importing the root reducer which combines all the app's reducers
import rootReducer from "./reducer";

// Creating the Redux store using configureStore, which takes a configuration object
// The `reducer` property is set to the rootReducer, which contains the app's state logic
const store = configureStore({
  reducer: rootReducer,
});

// Selecting the root DOM element where the React app will be rendered
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the React app inside the root DOM element
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
