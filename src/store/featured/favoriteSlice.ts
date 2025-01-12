import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Listing } from "../../types";

interface FavoriteState {
  favoriteListings: Listing[];
}

const initialState: FavoriteState = {
  favoriteListings: [],
};

export const favoriteSlice = createSlice({
  name: "myFavorites",
  initialState,
  reducers: {
    setFavoriteListings: (state, action: PayloadAction<Listing[] | []>) => {
      state.favoriteListings = action.payload;
    },
    addFavoriteListing: (state, action: PayloadAction<Listing>) => {
      state.favoriteListings.push(action.payload);
    },
    removeFavoriteListing: (state, action: PayloadAction<string>) => {
      state.favoriteListings = state.favoriteListings.filter(
        (listing) => listing.id !== action.payload
      );
    },
  },
});

export const {
  setFavoriteListings,
  addFavoriteListing,
  removeFavoriteListing,
} = favoriteSlice.actions;
