import React from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import useHeaderColor from "../../hooks/useHeaderColor";
import { getMenuStyles } from "../../utils/common.js";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const [menuOpened, setMenuOpened] = React.useState(false);
  const headerColor = useHeaderColor();

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter paddings innerWidth h-container">
          <Link to="/">
            <img src="./logo.png" alt="logo" width={100} />
          </Link>
          <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
            <a href="mailto:adnansmemail@gmail.com">Contact</a>
            <button className="button">Login</button>
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
