import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Listings from "./Listings";
import userContext from "./userContext";


/** List of routes for Jobly
 *
 * props:
 * - login: function to handle login form submit passed from app
 * - signup: function to handle signup form submit passed from app
 * - update: function to handle update form submit passed from app
 *
 * context:
 * - currUser: current user data
 *
 * routes available if currUser: /companies, /jobs, /companies/:handle, /profile
 * routes available if no currUser: /login, /signup
 * routes always available: /, *
 *
 * app -> RoutesList -> Homepage/CompanyList/JobList/CompanyDetail/LoginForm/SignupForm/Profile
 *
 */

function RoutesList({ login, signup, update }) {



  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginForm handleLogin={login} />} />
      <Route path="/signup" element={<SignupForm handleSignup={signup}/>} />
      <Route path="/listings" element={<Listings />} />
      {/* <Route path="/" element={<Profile />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;