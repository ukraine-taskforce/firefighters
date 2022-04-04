import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { muiTheme } from "./styles/theme";

import "./index.css";
import "./others/contexts/i18n";
import reportWebVitals from "./reportWebVitals";
import { Home } from "./pages/home";
import { NotFound } from "./pages/notFound";

const Providers: React.FunctionComponent = ({ children }) => (
  <MuiThemeProvider theme={muiTheme}>
    {children}
  </MuiThemeProvider>
);

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
