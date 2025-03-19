import React from "react";
import ReactDOM from "react-dom/client";
import PopupContainer from "./containers/PopupContainer";
import "./popup.css";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(<PopupContainer />);
}
