import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import "./styles/store-theme.css";
import "./styles/admin-theme.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { GuestCartProvider } from "./context/GuestCartContext";

const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <AuthProvider>
          <GuestCartProvider>
            <App />
          </GuestCartProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>
);
