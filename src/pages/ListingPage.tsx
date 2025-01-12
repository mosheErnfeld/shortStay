import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EmptyState from "../components/EmptyState";
import ListingClient from "../components/listingClient/ListingClient";
import useFetch from "../hooks/useFetch";
import LoadingPage from "./LoadingPage";
import { EnhancedListing } from "../types";
import { GET_LISTING_WITH_ALL_INFO } from "../constants/costants";

const ListingPage = () => {
  const { id } = useParams();

  const [listingDetailes, setListingDetailes] =
    useState<EnhancedListing | null>(null);
  const { fetchData, data: res, loading } = useFetch();

  useEffect(() => {
    if (!id) return;
    console.log(id);
    fetchData({
      url: GET_LISTING_WITH_ALL_INFO,
      method: "GET",
      params: { listingId: id },
      // params: { ID_EQ_1: id },
    });
  }, [id]);

  useEffect(() => {
    if (!res) return;
    setListingDetailes(res.data);
  }, [res]);

  if (!listingDetailes) {
    return <EmptyState />;
  }

  if (loading) {
    return <LoadingPage />;
  }

  return <ListingClient data={listingDetailes} />;
};

export default ListingPage;
