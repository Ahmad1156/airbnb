import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservartionClient from "./ReservartionClient";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const reservations = await getReservations({
    authorId: user.id,
  });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations"
        subtitle="You have no reservations on your properties yet"
      />
    );
  }
  return <ReservartionClient reservations={reservations} currentUser={user} />;
};

export default page;
