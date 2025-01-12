import React, { useCallback, useEffect, useMemo } from "react";
import { useAppSelector } from "../store/store";
import useLoginModal from "./useLoginModal";
import { useDispatch } from "react-redux";
import useFetch from "./useFetch";
import {
  addFavoriteListing,
  removeFavoriteListing,
} from "../store/featured/favoriteSlice";
import { ADD_REMOVE_FAVORITE_LISTING } from "../constants/costants";

const useFavorite = (listingId: string) => {
  const currentUser = useAppSelector((state) => state.currentUser.userId);
  const favoriteListings = useAppSelector(
    (state) => state.favorite.favoriteListings
  );
  const dispatch = useDispatch();
  const loginModal = useLoginModal();
  const { fetchData, data: res } = useFetch();

  const hasFavorited = useMemo(() => {
    const list = favoriteListings.map((listing) => listing.id);
    return list.includes(listingId);
  }, [favoriteListings, listingId]);

  useEffect(() => {
    if (!res) return;
    if (res.data.message === "Favorite removed") {
      dispatch(removeFavoriteListing(listingId));
    } else {
      dispatch(addFavoriteListing(res.data.listing));
    }
  }, [res]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();
      fetchData({
        url: ADD_REMOVE_FAVORITE_LISTING,
        method: "GET",
        params: { userId: currentUser, listingId },
      });
    },

    [currentUser, listingId, loginModal]
  );

  return { hasFavorited: hasFavorited, toggleFavorite };
};

export default useFavorite;
