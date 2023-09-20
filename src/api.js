import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class YardHoppersApi {
  static token = "";

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${YardHoppersApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a listings by listId. */
  static async getListing(listing_id) {
    let res = await this.request(`listings/${listing_id}`);
    return res.listing;
  }

  /** Get details on all listings. */
  static async getListings() {
    let res = await this.request("listings");
    return res.listings;
  }

  static async createListing(newListingData) {
    let res = await this.request("listings", newListingData, "post");
    return res.listing;
  }

  /** Delete a listing by listId. */
static async deleteListing(listing_id) {
  let res = await this.request(
    `listings/${listing_id}`,
    {},
    "delete");
  return res;
}

  /** Get details about User by username/token */
  static async getUserData(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update details for specific listing. */
  static async update(listId, { price, description, photo_url }) {
    let res = await this.request(
      `listings/${listId}`,
      { price, description, photo_url },
      "patch"
    );
    return res.user;
  }

  /** Return token when creating a new user. */
  static async register({ username, password, firstName, lastName, email }) {
    try {
      let res = await this.request(
        "auth/register",
        { username, password, firstName, lastName, email },
        "post"
      );
      this.token = res.token;
      return res.token;
    } catch (err) {
      console.error("API Error:", err);
      let message =
        err.response?.data?.error?.message || "Something went wrong.";
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Return token when logging in as existing user. */
  static async login(username, password) {
    let res = await this.request("auth/token", { username, password }, "post");
    this.token = res.token;
    return res.token;
  }
}

export default YardHoppersApi;
