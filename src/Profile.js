import { useContext, useState } from "react";
import userContext from "./userContext";
import "./Profile.css";
import { Button, Form, Container, Card, ListGroup } from "react-bootstrap";

function Profile({ updateUserInfo, updateListing }) {
  const { currUser } = useContext(userContext);
  const [isEditing, setIsEditing] = useState(false);
  const [currentListing, setCurrentListing] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [editedListing, setEditedListing] = useState({});

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleListingChange = (e, listingId) => {
    const { name, value } = e.target;
    setEditedListing({
      ...editedListing,
      [listingId]: { ...editedListing[listingId], [name]: value }
    });
  };
  const saveListingChanges = (e, listingId) => {
    e.preventDefault();
    updateListing(listingId, editedListing[listingId]);
    setCurrentListing(null);
  };

  const saveUserProfile = (e) => {
    e.preventDefault();
    updateUserInfo(editedUser);
    setIsEditing(false);
  };


  return (
    <Container className="profile mt-5">
      <header className="profile-header mb-5">
        <h1>Profile</h1>
      </header>

      <div className="d-flex justify-content-start">
        <Card style={{ width: '18rem' }} className="mr-5">
          <Card.Header>Profile Details</Card.Header>
          <ListGroup variant="flush">
            {isEditing ? (
              <Form onSubmit={saveUserProfile}>
                <ListGroup.Item>
                  <Form.Control
                    type="text"
                    name="username"
                    defaultValue={currUser.username}
                    onChange={handleUserChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Control
                    type="text"
                    name="firstName"
                    defaultValue={currUser.firstName}
                    onChange={handleUserChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Control
                    type="text"
                    name="lastName"
                    defaultValue={currUser.lastName}
                    onChange={handleUserChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Control
                    type="email"
                    name="email"
                    defaultValue={currUser.email}
                    onChange={handleUserChange} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type="submit" variant="primary">Save</Button>
                  <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                </ListGroup.Item>
              </Form>
            ) : (
              <>
                <ListGroup.Item><strong>Username:</strong> {currUser.username}</ListGroup.Item>
                <ListGroup.Item><strong>First Name:</strong> {currUser.firstName}</ListGroup.Item>
                <ListGroup.Item><strong>Last Name:</strong> {currUser.lastName}</ListGroup.Item>
                <ListGroup.Item><strong>Email:</strong> {currUser.email}</ListGroup.Item>
                {/* <ListGroup.Item><Button onClick={() => setIsEditing(true)}>Edit Profile</Button></ListGroup.Item> */}
              </>
            )}
          </ListGroup>
        </Card>
      </div>

      <div className="mt-4">
        <h2 className="profile-header">Your Listings</h2>
        {currUser.listings.map(listing => (
          <Card className="mb-3" key={listing.listing_id}>
            <Card.Body>
              {currentListing === listing.listing_id ? (
                <Form onSubmit={(e) => saveListingChanges(e, listing.listing_id)}>
                  <Form.Control
                    type="text"
                    name="description"
                    defaultValue={listing.description}
                    onChange={(e) => handleListingChange(e, listing.listing_id)} />
                  <Form.Control
                    type="text"
                    name="price"
                    defaultValue={listing.price}
                    onChange={(e) => handleListingChange(e, listing.listing_id)} />
                  <Button type="submit" variant="primary">Save</Button>
                  <Button variant="secondary" onClick={() => setCurrentListing(null)}>Cancel</Button>
                </Form>
              ) : (
                <>
                  <Card.Text>
                    {listing.description} - ${listing.price}
                  </Card.Text>
                  {/* <Button onClick={() => setCurrentListing(listing.listing_id)}>Edit</Button> */}
                </>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default Profile;


