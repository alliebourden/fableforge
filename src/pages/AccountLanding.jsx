import React, { useState, useEffect, useRef, useContext } from "react";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";


export default function AccountLanding() {

  return (
        <div className="account-landing-container">
          <div>
            <Login />
          </div>
          <div>
            <CreateAccount />
          </div>
        </div>
  );
}
