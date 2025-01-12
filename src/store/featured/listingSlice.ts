import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Listing } from "../../types";

interface ListingState {
  listings: Listing[];
}

const initialState: ListingState = {
  listings: [],
};

export const ListingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action:PayloadAction<Listing[]>)=>{
        state.listings = action.payload
    },

    addListing: (state, action:PayloadAction<Listing>) => {
        state.listings.unshift(action.payload)
    }
  },
});

 export const {setListings, addListing} = ListingSlice.actions
