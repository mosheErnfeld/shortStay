import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import EmptyState from "../components/EmptyState";
import TripsClient from "../components/tripsClient/TripsClient";
import useFetch from "../hooks/useFetch";
import LoadingPage from "./LoadingPage";
import { GET_ALL_RESERVATIONS_FOR_USER } from "../constants/costants";

const Trips = () => {
  const [reservations, setReservations] = useState([]);

  const currentUser = useAppSelector((state) => state.currentUser.user);

  const { fetchData, data: res, loading } = useFetch();

  useEffect(() => {
    if (!currentUser) return;
    const userId = currentUser.id;
    console.log(userId);
    fetchData({
      url: GET_ALL_RESERVATIONS_FOR_USER,
      method: "GET",
      params: { ID_EQ_1: userId },
    });
  }, [currentUser]);

  useEffect(() => {
    if (!res) return;
    console.log(res);
    setReservations(res);
  }, [res]);

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips"
      />
    );
  }

  if (loading) {
    return <LoadingPage />;
  }
  console.log(reservations);
  return (
    <TripsClient
      reservations={reservations}
      // onDelete={() => setReservations}
    />
  );
};

export default Trips;
