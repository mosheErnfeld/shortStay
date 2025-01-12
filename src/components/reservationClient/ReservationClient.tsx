
import { Reservation } from "../../types";
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";

interface ReservationsClientProps {
  reservations: Reservation[];
  onCancel: (id: string) => void;
  deletingId: string;
}
const ReservationClient: React.FC<ReservationsClientProps> = ({
  reservations,
  onCancel,
  deletingId,
}) => {
  
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
