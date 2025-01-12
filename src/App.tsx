import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import TopbarLayout from "./layout/TopbarLayout";
import Home from "./pages/Home";
import { useEffect } from "react";
// import { useAppSelector } from "./store/store";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/featured/userSlice";
import ListingPage from "./pages/ListingPage";
import Trips from "./pages/Trips";
import Reservations from "./pages/Reservations";
import Properties from "./pages/Properties";
import Favorites from "./pages/Favorites";
import useFetch from "./hooks/useFetch";
import LoadingPage from "./pages/LoadingPage";
import { useAuthCookies } from "./hooks/useAuthCookies";
import { useAppSelector } from "./store/store";
import { setFavoriteListings } from "./store/featured/favoriteSlice";
import { GET_CURRENT_USER, GET_FAVORITE_LISTINGS } from "./constants/costants";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<TopbarLayout />}>
      <Route index element={<Home />} />
      <Route path="listing">
        <Route path=":id" element={<ListingPage />} />
      </Route>
      <Route path="trips" element={<Trips />} />
      <Route path="reservations" element={<Reservations />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="properties" element={<Properties />} />
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  const { data, fetchData, loading } = useFetch();
  const { isAuthenticated, userId: id } = useAuthCookies();
  const userId = useAppSelector((state) => state.currentUser.userId);

  const {
    fetchData: fetchFavorite,
    data: resfavorite,
  } = useFetch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setCurrentUser({ user: null, userId: null }));
      return;
    }
    fetchData({ url: GET_CURRENT_USER + id, method: "GET" , params: {id}});
  }, [isAuthenticated]);

  useEffect(() => {
    if (!data) return;
    dispatch(setCurrentUser({ userId: data.id, user: data }));
  }, [data]);

  useEffect(() => {
    fetchFavorite({
      url: GET_FAVORITE_LISTINGS,
      method: "GET",
      params: { USER_EQ_1: userId },
    });
  }, [userId]);

  useEffect(() => {
    console.log(resfavorite)
    if (!resfavorite) return
    dispatch(setFavoriteListings(resfavorite))
  }, [resfavorite]);

  if (loading) {
    return <LoadingPage />;
  }

  return <RouterProvider router={router} />;
}

export default App;
