import { useEffect } from "react";
import { useAppSelector } from "../store/store";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "../components/propertiesClient/PropertiesClient";
import useFetch from "../hooks/useFetch";
import LoadingPage from "./LoadingPage";
import { GET_MY_LISTINGS } from "../constants/costants";
import { useDispatch } from "react-redux";
import { setMyListings } from "../store/featured/myListingsSlice";

const Properties = () => {
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const { fetchData, data: res, loading } = useFetch();

  const myListings = useAppSelector((state) => state.myListings.listings);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData({ url: GET_MY_LISTINGS, method: "GET" });
  }, []);

  useEffect(() => {
    if (!res) return;
    dispatch(setMyListings(res));
  }, [res]);

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (loading) {
    return <LoadingPage />;
  }

  if (myListings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return <PropertiesClient listings={myListings} />;
};

export default Properties;
