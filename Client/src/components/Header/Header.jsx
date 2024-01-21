import React from 'react';
import './Header.css'
import { BiMenuAltRight } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import useHeaderColor from "../../hooks/useHeaderColor";
import{getMenuStyles} from '../../utils/common.js'

const Header = () => {
  const [menuOpened, setMenuOpened] = React.useState(false);
  const headerColor = useHeaderColor();

  return (
      <section className="h-wrapper" style={{ background: headerColor }}>
        <div className="flexCenter paddings innerWidth h-container">
          <img src="./logo.png" alt="logo" width={100} />

          <OutsideClickHandler onOutsideClick={()=>setMenuOpened(false)}>

          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <a href="#residencies">Residencies</a>
            <a href="#value">Our Values</a>
            <a href="#contact-us">Contact Us</a>
            <a href="#get-started">Get Started</a>
            <button className='button'>
              <a href="">Contact</a>
            </button>
          </div>
          </OutsideClickHandler>
          <div className="menu-icon" onClick={()=>setMenuOpened((prev)=>!prev)}>
            <BiMenuAltRight size={30} /> 
          </div>
        </div>
      </section>
  );
};

export default Header