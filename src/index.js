import React from "react";
import ReactDOM from "react-dom";
import s from "./App.css";
import "./index.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App className={s.App} />
  </React.StrictMode>,
  document.getElementById("root")
);
