import { useContext } from "react";
import userContext from "./userContext";
import "./Homepage.css";
import logo from "./logo.png";

/** Homepage for Yard Hoppers
 *
 * context:
 * - currUser: current user data
 *
 * App -> RoutesList -> Homepage
 *
 */

function Homepage() {
  const { currUser } = useContext(userContext);
  return (
    <div className="home">
      <header className="home-header">
        <img src={logo} className="home-logo" alt="logo" />
        {!currUser && (
        <div>
            <h6>Proceed to <a href="/login">Login</a> page for login creds.</h6>
            <h6>Or <a href="/signup">Sign Up</a> to create a new profile where you can create/delete your own listings!</h6>
        </div>
        )}
        <div className="title">
        {currUser && <h3>Welcome, {currUser.username}!</h3>}
          <h1>Yard Hoppers</h1>
          <h2>A Solution for Unused Spaces</h2>
          <p>A marketplace where homeowners can list their outdoor spaces
          as rental accomodations for travelers who prefer to sleep under the stars.
          </p>
          <h4>Get on my lawn!</h4>
        </div>
      </header>
      <p>Tech Stack: React | AWS3 | JWT | Bootstrap</p>

    </div>
  );
}

export default Homepage;
