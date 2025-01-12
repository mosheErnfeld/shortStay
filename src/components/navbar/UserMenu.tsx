import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { useAppSelector } from "../../store/store";
import useRentModal from "../../hooks/useRentModal";
import { useNavigate } from "react-router";
import { useAuthCookies } from "../../hooks/useAuthCookies";

const UserMenu = () => {
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const { clearAuthCookies} = useAuthCookies()

  useEffect(() => {
    const handelClick = () => {
      setIsOpen(false);
    };

    document.addEventListener("click", handelClick);
    
    return () => document.removeEventListener("click", handelClick);
  }, []);

  const toggleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  

  const logout = () => {
    clearAuthCookies()
  };

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();

  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Airbnb Your Home
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div
            className="flex flex-col cursor-pointer"
            // onClick={() => toggleOpen()}
          >
            {currentUser ? (
              <>
                <MenuItem onClick={() => navigate('/trips')} label="My Trips" />
                <MenuItem onClick={() => navigate('/favorites')} label="My Favorites" />
                <MenuItem onClick={() => navigate('/reservations')} label="My Reservations" />
                <MenuItem onClick={() => navigate('/properties')} label="My properties" />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb My Home" />
                <hr />
                <MenuItem onClick={logout} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
