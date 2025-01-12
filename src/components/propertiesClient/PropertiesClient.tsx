import { Listing } from "../../types";
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";

interface PropertiesClientProps {
  listings: Listing[];
  onCancel: (id: string) => void;
  deletingId: string;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  onCancel,
  deletingId,
}) => {
  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
