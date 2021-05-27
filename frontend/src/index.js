import React from "react";
import ReactDOM from "react-dom";
// import BrowserRouter and Route
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* render App if the path is `/` */}
      <Route path="/" component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);