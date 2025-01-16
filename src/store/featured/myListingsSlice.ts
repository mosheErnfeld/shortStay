import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Listing } from "../../types";

interface MyListingState {
  listings: Listing[];
}

const initialState: MyListingState = {
  listings: [],
};

export const MyListingSlice = createSlice({
  name: "myListings",
  initialState,
  reducers: {
    setMyListings: (state, action: PayloadAction<Listing[]>) => {
      state.listings = action.payload;
    },

    addToMyListings: (state, action: PayloadAction<Listing>) => {
      state.listings.unshift(action.payload);
    },

    deleteListing: (state, action: PayloadAction<string>) => {
      state.listings = state.listings.filter(
        (listing) => listing.id !== action.payload
      );
    },
  },
});

export const { setMyListings, addToMyListings, deleteListing } =
  MyListingSlice.actions;
