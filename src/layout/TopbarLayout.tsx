import { Toaster } from "react-hot-toast";
import LoginModal from "../components/modals/LoginModal";
import Navbar from "../components/navbar/Navbar";
import { Outlet} from "react-router";
import RegisterModal from "../components/modals/RegisterModal";
import { useAppSelector } from "../store/store";
import RentModal from "../components/modals/RentModal";
import SearchModal from "../components/modals/SearchModal";
// import GoogleMapModal from "../components/modals/GoogleMapModal";

const TopbarLayout = () => {
  const currentUser = useAppSelector(state => state.currentUser.user)
  return (
    <>
      <header>       
        <Toaster />
        <LoginModal />
        <RegisterModal />
        {currentUser && <RentModal />}
        <SearchModal />
        {/* <GoogleMapModal /> */}
        <Navbar />
      </header>
      <main className="pb-20 pt-28">
        <Outlet />
      </main>
    </>
  );
};

export default TopbarLayout;
