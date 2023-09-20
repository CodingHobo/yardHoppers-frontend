import { useContext } from "react";
import userContext from "./userContext";
import "./Profile.css"

function Profile() {
  const { currUser } = useContext(userContext);
  console.log(currUser)

  return (
    <div className="profile">
      <header className="profile-header">
       Profile
      </header>
    </div>
  )
}
export default Profile