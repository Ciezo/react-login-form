import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import UserHome from "./pages/UserHome";
import AuthProvider from "react-auth-kit";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import createStore from "react-auth-kit/createStore";

export default function App() {
  /**
   * Configure the storage to set _auth properties
   * for cookie value assignments.
   *
   * Reference:
   * https://authkit.arkadip.dev/getting_started/integration/react-app/
   */
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "http:",
  });

  return (
    <>
      {/* This enables react-auth-kit to function as intended */}
      <AuthProvider store={store}>    {/* https://authkit.arkadip.dev/getting_started/integration/react-app/ */}
        <Router>
          <CssBaseline />

          {/* Main content goes here */}
          <main>
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
                  <Route path="/" Component={LoginUser} />
                  <Route path="/register" Component={RegisterUser} />
                  {/* Authenticated Only */}
                  {/* ========================================================== */}
                  <Route element={<AuthOutlet fallbackPath="/" />}>
                    <Route path="/home" Component={UserHome} />
                  </Route>
                  {/* ========================================================== */}
                </Routes>
              </Grid>
            </Grid>
          </main>

        </Router>
      </AuthProvider>
    </>
  );
}
