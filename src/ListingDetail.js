import React, { useEffect, useState, useContext } from 'react';
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import userContext from "./userContext";
import { useParams, useNavigate } from 'react-router-dom';
import YardHoppersApi from './api';
import './ListingDetail.css'


/** Component to display details about details for specific listing
 *
 * State:
 * - listingDetails: { listing: { handle, name, description, numEmployees, logoUrl,
 *                  jobs: [{id, title, salary, equity}]}
 *                  isLoading: determines what get rendered based on value}
 *
 * RoutesList/ListingList -> ListingDetails
 *
 */

function ListingDetail() {
  const [listing, setListing] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { listing_id } = useParams();
  const { currUser } = useContext(userContext);

  const history = useNavigate();  // Use this for navigation

  console.log(listing_id)
  console.log("Host user =", listing.host_user)
  console.log("Current user=", currUser.username)

  const handleDeleteListing = async () => {
    try {
      await YardHoppersApi.deleteListing(listing_id);  // Use the API directly here
      history.push('/listings');  // Redirect the user back to the listings page
    } catch (err) {
      console.error("Error deleting the listing:", err);
      // Handle error (maybe show a notification to the user)
    }
  }

  useEffect(() => {
    async function fetchListing() {
      try {
        const response = await YardHoppersApi.getListing(listing_id);
        setListing(response);
      } catch (error) {
        console.error("error ===>", error);
      }
      setIsLoading(false);
    }
    fetchListing();
  }, [listing_id]);

  if (isLoading) return <i>Loading...</i>;

  if (!listing || Object.keys(listing).length === 0) {
    return <div>No listing found.</div>;
  }

  return (
    <div className="ListingDetailPage">
    <Container className="listing-card-container">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img variant="top" src={listing.photo_url} />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{listing.title}</Card.Title>
              <Card.Text>
                {listing.city}, {listing.state}
              </Card.Text>
              <Card.Text>{listing.description}</Card.Text>
              <Card.Text>${listing.price}/day</Card.Text>
                {currUser && <Button variant='primary'>Book Now</Button>}
              {currUser.username === listing.host_user && (
                <Button variant='danger' onClick={handleDeleteListing}>Delete Listing</Button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
    </div>
  );
}

export default ListingDetail;