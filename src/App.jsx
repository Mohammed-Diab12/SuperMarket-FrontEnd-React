import React from "react";
import AppProviders from "./AppProviders";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
