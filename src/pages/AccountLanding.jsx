import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../Theme";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";


export default function AccountLanding() {

  return (
    <ThemeProvider theme={theme}>
        <div className="account-landing-container">
          <div>
            <Login />
          </div>
          <div>
            <CreateAccount />
          </div>
        </div>
    </ThemeProvider>
  );
}
