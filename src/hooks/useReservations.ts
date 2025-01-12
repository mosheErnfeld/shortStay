import { useCallback } from "react";
import { useAppSelector } from "../store/store";
import axios from "axios";

const useReservations = () => {
  const currentUser = useAppSelector((state) => state.currentUser.user?.id);
  const getReservations = useCallback(async () => {
    if (!currentUser) return null;
    const fetch = async () => {
      axios
        .get(`/api/reservation/${currentUser}`, {
          params: { userId: currentUser },
        })
        .then((data) => {
          console.log(data.data);
          return data.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    };
    await fetch();
  }, [currentUser]);

  return { getReservations };
};

export default useReservations;
