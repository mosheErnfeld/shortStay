import { useCallback, useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import { useAppSelector } from "../store/store";
import ReservationClient from "../components/reservationClient/ReservationClient";
import useFetch from "../hooks/useFetch";
import { Reservation } from "../types";
import { DELETE_RESERVATION, GET_ALL_RESERVATIONS_FOR_AUTHOR } from "../constants/costants";

const Reservations = () => {
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const [reservations, setReservations] = useState<Reservation[] | []>([]);
  const [deletingId, setDeletingId] = useState("");
  const { fetchData, data: res} = useFetch();
  const { fetchData: deleteData, data: resDelete } = useFetch();
  useEffect(() => {
    if (!currentUser || deletingId !== "") return;
    const userId = currentUser.id;

    fetchData({
      url: GET_ALL_RESERVATIONS_FOR_AUTHOR,
      method: "GET",
      params: { USER_EQ_1: userId },
    });
  }, [currentUser, deletingId]);

  useEffect(() => {
    if (!res) return;
    setReservations(res);
  }, [res]);

  const onCancel = useCallback(
    (id: string) => {
      if (!currentUser?.id) throw new Error("no current user");
      setDeletingId(id);

      deleteData({ url: DELETE_RESERVATION, method: "DELETE", params: { id } });
    },
    [currentUser]
  );

  useEffect(() => {
    if (!resDelete || resDelete?.deleted == 0) return;
    setReservations((prev) => prev.filter((item) => item.id !== deletingId));
    setDeletingId("");
  }, [resDelete]);

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    console.log(reservations);
    return (
      <EmptyState
        title="No Reservations found"
        subtitle="Looks like you haven't reserved any trips"
      />
    );
  }
  
  return (
    <ReservationClient
      reservations={reservations}
      onCancel={onCancel}
      deletingId={deletingId}
    />
  );
};

export default Reservations;
