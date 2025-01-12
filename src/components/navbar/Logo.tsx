import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to='/'>
      <img
        src="/images/logo.png"
        alt="logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
      />
    </Link>
  );
};

export default Logo;
