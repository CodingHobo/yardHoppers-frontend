import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Listings from "./Listings";
import Profile from './Profile'
import ListingDetail from "./ListingDetail"
import CreateListingForm from "./CreateListingForm"
import userContext from "./userContext";


/** List of routes for Jobly
 *
 * props:
 * - login: function to handle login form submit passed from app
 * - signup: function to handle signup form submit passed from app
 * - updateUserInfo: function to handle update user form submit passed from app
 * - updateListing: function to handle update listing form submit passed from app
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

function RoutesList({
  login,
  signup,
  updateUserInfo,
  createListing,
  updateListing,
  deleteListing,
  listState }) {
  const { currUser } = useContext(userContext);

  return (
    <Routes>
  {!currUser &&
  <>
      <Route path="/login" element={<LoginForm handleLogin={login} />} />
      <Route path="/signup" element={<SignupForm handleSignup={signup}/>} />

      </>
  }

{currUser &&
        <>
        <Route path="/profile" element={<Profile
          updateUserInfo={updateUserInfo}
          updateListing={updateListing} />
} />
      <Route path="/new-listing" element={<CreateListingForm  handleCreateListing={createListing}/>}  />
      </>
}

      <Route path="/" element={<Homepage />} />
      <Route path="/listings" element={<Listings listState={listState}/>} />
      <Route path="/listings/:listing_id" element={<ListingDetail handleDeleteListing={deleteListing} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  );
}

export default RoutesList;
