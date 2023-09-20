import React, { useEffect, useState, useContext } from 'react';
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import userContext from "./userContext";
import { useParams, useNavigate } from 'react-router-dom';
import YardHoppersApi from './api';
import './ListingDetail.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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

  const navigate = useNavigate();

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

  async function handleDeleteListing() {
      try {
          await YardHoppersApi.deleteListing(listing_id);

          toast.success('Listing deleted successfully!', {
              onClose: () => navigate("/listings"),  // redirect when the toast is closed
              autoClose: 3000  // close toast after 3 seconds
          });

      } catch (error) {
          console.error("Error deleting listing:", error.message);
          toast.error('Error deleting listing. Please try again.');
      }
  }

  return (
    <div className="ListingDetailPage">
      <ToastContainer />
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
                    <Button
                      variant='danger'
                      onClick={() =>
                        handleDeleteListing(currUser.username)}>
                      Delete Listing
                    </Button>
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