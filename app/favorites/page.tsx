import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const user = await getCurrentUser();
  const listings = await getFavoriteListings();
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings yet"
      />
    );
  }
  return <FavoritesClient listings={listings} currentUser={user} />;
};

export default ListingPage;
