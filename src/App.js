import "./App.css";
import Navigation from "./Navigation";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import YardHoppersApi from "./api";
import jwt_decode from "jwt-decode";
import userContext from "./userContext";

function App() {
  const [token, setToken] = useState(localStorage.getItem("yhToken"));
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState({
    listings: null,
    isLoading: true,
  });

  const listState = {listings, setListings}

  /** useEffect to check state of token.
   * If token, decode token as payload.
   * Make axios request with payload.username.
   * Set response as currUser.
   */
  useEffect(
    function checkToken() {
      async function decodeToken() {
        if (token) {
          const payload = jwt_decode(token);

          YardHoppersApi.token = token;

          const user = await YardHoppersApi.getUserData(payload.username);
          setCurrUser(user);
          setIsLoading(false);
        } else {
          setCurrUser(null);
          setIsLoading(false);
        }
      }
      decodeToken();
    },
    [token]
  );

  /** Set joblyToken in localStorage to value of token */
  useEffect(
    function updateLocalStorage() {
      if (token) {
        localStorage.setItem("yhToken", token);
      } else {
        localStorage.removeItem("yhToken");
      }
    },
    [token]
  );

  /** Make request to login, set response as token. */
  async function login({username, password}) {
    const resp = await YardHoppersApi.login( username, password );
    setToken(resp);
  }

  /** Make request to sign up, set response as token. */
  async function signup(data) {
    const resp = await YardHoppersApi.register(data);
    setToken(resp);
  }

  // /** Make request to update user information, set response as currUser */
  // async function update(data) {
  //   const resp = await YardHoppersApi.update(data);
  //   setCurrUser(resp);
  // }

  /** Log out user, reset token. */
  function logout() {
    setToken("");
  }

async function createListing(data) {
 const resp = await YardHoppersApi.createListing(data);
 const updatedListings = {...listings, resp}
 setListings(updatedListings);
  }

  if (isLoading) return <i>Loading...</i>;
  return (
    <div className="App">
      <userContext.Provider value={ currUser }>
        <BrowserRouter>
          <Navigation logout={logout}/>
          <RoutesList login={login} signup={signup} createListing={createListing} listState={listState}/>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
