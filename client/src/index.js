import React from "react";
import App from "./components/App";
import { Provider } from 'react-redux';
import { store } from './app/store'; // Import the store
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Provider store={store}>
    <App />
</Provider>);
