import Container from "../Container";
// import { AddPropertyButton } from "../test/components/AddPropertyButton";
// import GoogleMaps from "../test/GoogleMaps";
import Categories from "./Categories";
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"

const Navbar = () => {
 
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Logo />
                <Search />
                <UserMenu />
                {/* <GoogleMaps /> */}
                {/* <AddPropertyButton /> */}
            </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
