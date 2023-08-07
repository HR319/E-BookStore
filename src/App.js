import "./App.css";
import React from "react";
// import { theme } from "./utils/theme";
import "react-toastify/dist/ReactToastify.css";
import Booklist from "./components/Booklist";
import HomePage from "./components/HomePage";
import Form from "./components/Form";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";

function App() {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "green",
          },
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer />
          <div style={{ ...GlobalStyles.navbar }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/books">Booklist</NavLink>
            <NavLink to="/form">Form</NavLink>
          </div>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/books" element={<Booklist />} />
            <Route exact path="/form" element={<Form />} />

            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
