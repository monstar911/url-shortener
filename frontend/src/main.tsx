import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { UrlProvider } from "./contexts/UrlContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UrlProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UrlProvider>
    </AuthProvider>
  </React.StrictMode>
);
