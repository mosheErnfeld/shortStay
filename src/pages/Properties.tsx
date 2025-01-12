import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../store/store";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "../components/propertiesClient/PropertiesClient";
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import { Listing } from "../types";
import LoadingPage from "./LoadingPage";
import { DELETE_LISTING, GET_MY_LISTINGS } from "../constants/costants";

const Properties = () => {
  const [myProperties, setMyProperties] = useState<Listing[] | []>([]);
  const [deletingId, setDeletingId] = useState("");

  const currentUser = useAppSelector((state) => state.currentUser.user);
  const { fetchData, data: res, loading } = useFetch();
  const { fetchData: deleteData, data: resDelete, loading: loadingDelete } = useFetch();
  useEffect(() => {
    fetchData({ url: GET_MY_LISTINGS, method: "GET" });
  }, []);

  useEffect(() => {
    if (!res) return;
    setMyProperties(res);
  }, [res]);

  const onCancel = useCallback(
    (id: string) => {
      if (!currentUser?.id) throw new Error("no current user");
      setDeletingId(id)
      deleteData({
        url: DELETE_LISTING,
        method: "DELETE",
        params: { id },
      });
    },
    [currentUser]
  );

  useEffect(() => {
    if (!resDelete || resDelete?.deleted == 0) return;
    toast.success("listing deleted");
    setMyProperties((prev) => prev.filter(item => item.id !== deletingId))
    setDeletingId('')
  }, [resDelete]);

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if(loading || loadingDelete) {
    return <LoadingPage />
  }

  if (myProperties.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return (
    <PropertiesClient
      listings={myProperties}
      onCancel={onCancel}
      deletingId={deletingId}
    />
  );
};

export default Properties;
