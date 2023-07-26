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
          <h5>Thanks for checking out my demo!</h5>
          <h6>Proceed to <a href="/login">Login</a> page for instructions on navigating the site.</h6>
        </div>
        )}
        <div className="title">
        {currUser && <h3>Welcome, {currUser.username}!</h3>}
          <h1>Yard Hoppers</h1>
          <h4>Get on my lawn!</h4>
        </div>
      </header>
    </div>
  );
}

export default Homepage;
