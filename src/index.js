import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UnitsContextWrapper from "./state/UnitsContextWrapper";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UnitsContextWrapper>
        <App />
      </UnitsContextWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
