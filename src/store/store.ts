import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./featured/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ListingSlice } from "./featured/listingSlice";
import { favoriteSlice } from "./featured/favoriteSlice";

export const store = configureStore({
  reducer: {
    currentUser: userSlice.reducer,
    listings: ListingSlice.reducer,
    favorite: favoriteSlice.reducer
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
