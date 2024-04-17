import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import UserHome from "./pages/UserHome";

export default function App() {
  return (
    <>
      <Router>
        <CssBaseline />

        {/* Main content goes here */}
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Routes>
              <Route path="/" Component={ LoginUser }/>
              <Route path="/register" Component={ RegisterUser }/>
              {/* Authenticated Only */}
              {/* ========================================================== */}
              <Route path="/home" Component={ UserHome }/>
              {/* ========================================================== */}
            </Routes>
          </Grid>
        </Grid>
      </Router>b
    </>
  );
}
