import { useCallback, useEffect, useState } from "react";
import { Listing } from "../../types";
import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../listings/ListingCard";
import { DELETE_LISTING } from "../../constants/costants";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { deleteListing } from "../../store/featured/myListingsSlice";

interface PropertiesClientProps {
  listings: Listing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings }) => {
  const { fetchData, data: res } = useFetch();
  const [deletingId, setDeletingId] = useState("");
  const dispatch = useDispatch();
  const onDelete = useCallback((id: string) => {
    console.log(deletingId, id);
    setDeletingId(id);
    fetchData({
      url: DELETE_LISTING,
      method: "DELETE",
      params: { id },
    });
  }, []);

  useEffect(() => {
    if (!res) return;
    dispatch(deleteListing(deletingId));
    setDeletingId("");
  }, [res]);

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
