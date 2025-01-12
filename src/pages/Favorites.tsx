import EmptyState from "../components/EmptyState";
import { useAppSelector } from "../store/store";
import FavoritesClient from "../components/favoritesClient/FavoritesClient";

const Favorites = () => {
  const userId = useAppSelector((state) => state.currentUser.userId);

  const favoritesListings = useAppSelector(
    (state) => state.favorite.favoriteListings
  );

  if (!userId) {
    return <EmptyState title="Unauthorized" showReset />;
  }

  if (favoritesListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you no favorite listings"
      />
    );
  }

  return <FavoritesClient listings={favoritesListings} />;
};

export default Favorites;
