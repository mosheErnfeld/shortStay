import { useEffect } from "react";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import { useAppSelector } from "../store/store";
import { useDispatch } from "react-redux";
import { setListings } from "../store/featured/listingSlice";
import { useSearchParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { GET_LISTING_BY_FILTER } from "../constants/costants";
import EmptyState from "../components/EmptyState";
import LoadingPage from "./LoadingPage";

const Home = () => {
  const listings = useAppSelector((state) => state.listings.listings);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const { fetchData, data: res, loading } = useFetch();

  useEffect(() => {
    const query: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      if (value !== "") query[key] = value;
    });

    fetchData({
      url: GET_LISTING_BY_FILTER,
      method: "GET",
      params: query,
    });
  }, [searchParams]);

  useEffect(() => {
    if (!res) return;
    dispatch(setListings(res.data));
  }, [res]);

  if (loading) {
    return <LoadingPage />;
  }

  if (listings && listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return <ListingCard key={listing.id} data={listing} />;
        })}
      </div>
    </Container>
  );
};

export default Home;
