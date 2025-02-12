
import React from "react"; // Importing React to create and use React components
import ReactDOM from "react-dom/client"; // Importing ReactDOM for rendering React components into the DOM
import App from "./App"; // Importing the main application component
import { BrowserRouter } from "react-router-dom";  // Importing BrowserRouter from React Router to enable client-side routing
import { Toaster } from "react-hot-toast"; // Importing Toaster from react-hot-toast to show toast notifications in the application
import { Provider } from "react-redux"; // Importing Provider from React Redux to integrate the Redux store with the React app
import { configureStore } from "@reduxjs/toolkit"; // Importing configureStore from Redux Toolkit to create the Redux store
import rootReducer from "./reducer"; // Importing the root reducer which combines all the app's reducers

// Creating the Redux store using configureStore, which takes a configuration object
// The `reducer` property is set to the rootReducer, which contains the app's state logic
const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root")); // Selecting the root DOM element where the React app will be rendered

root.render( // Rendering the React app inside the root DOM element
  <React.StrictMode>
    {/* Providing the Redux store to the entire application using the Provider component */}
    <Provider store={store}> 
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
