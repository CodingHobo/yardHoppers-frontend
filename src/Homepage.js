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
  const isLoggedIn = !!currUser; // Check if currUser exists (i.e., user is logged in)

  return (
    <div className="home">
      {!isLoggedIn && (
        <div>
          <h4>Thanks for checking out my demo!</h4>
          <h5>
            Proceed to the <a href="/login">Login</a> Page for instructions on navigating the
            site.
          </h5>
        </div>
      )}
      <header className="home-header">
        <img src={logo} className="home-logo" alt="logo" />
        <div className="title">
          {isLoggedIn && <h3>Welcome, {currUser.username}!</h3>}
          <h1>Yard Hoppers</h1>
          <h4>Get on my lawn!</h4>
        </div>
      </header>
    </div>
  );
}

export default Homepage;