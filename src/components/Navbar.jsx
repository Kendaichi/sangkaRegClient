import Logo from "../assets/sangkalogoname.png";

import { Link } from "react-scroll";

// import { Link as RouteLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="font-header mt-3 fixed bg-white/90 rounded-xl z-40 top-0 left-0 right-0 mx-auto flex max-w-7xl items-center justify-between pt-1 pl-6 pr-6 pb-1">
      <div className="flex lg:flex-1">
        <Link to="home" className="-m-1.5 p-1.5 cursor-pointer">
          <span className="sr-only">Your Company</span>
          <img className="h-16 w-auto" src={Logo} alt="Logo" />
        </Link>
      </div>

      <div className="flex justify-center flex-2">
        <Link
          to="home"
          smooth={true}
          spy={true}
          className="text-tcolor mx-4 cursor-pointer"
        >
          Home
        </Link>
        <Link
          to="about"
          offset={-35}
          className="text-tcolor mx-4 cursor-pointer"
          smooth={true}
          spy={true}
        >
          What is Sangka?
        </Link>
        <Link
          to="events"
          offset={-35}
          className="text-tcolor mx-4 cursor-pointer"
          smooth={true}
          spy={true}
        >
          Events
        </Link>
        <Link
          to="contact"
          className="text-tcolor mx-4 cursor-pointer"
          smooth={true}
          spy={true}
        >
          Contact Us
        </Link>
      </div>

      {/* <div>
            <RouteLink to="/login" className="text-tcolor rounded-md py-2 px-4">Register</RouteLink>
        </div> */}
    </nav>
  );
};

export default Nav;
