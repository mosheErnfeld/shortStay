import { Reservation } from "../../types";
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../store/store";
import useFetch from "../../hooks/useFetch";
import LoadingPage from "../../pages/LoadingPage";
import { DELETE_RESERVATION } from "../../constants/costants";

interface TripsClientProps {
  reservations: Reservation[];
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
}) => {
  const userId = useAppSelector((state) => state.currentUser.user?.id);

  const [deletingId, setDeletingId] = useState("");

  const { fetchData, data: res, loading } = useFetch();

  const onCancel = useCallback(
    (id: string) => {
      if (!userId) throw new Error("no current user");
      setDeletingId(id);

      fetchData({ url: DELETE_RESERVATION, method: "DELETE", params: { id } });
    },
    [userId]
  );

  useEffect(() => {
    console.log(res);
    if (!res) return;

    setDeletingId("");
    toast.success("success");
    window.location.reload();
  }, [res]);

  if(loading) {
    return <LoadingPage />
  }

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            // currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
