import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";
import progileImg from "../imgs/p2.jpg";

function Navbar() {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  
  return (
    <>
      <div className="buttons">
        <a href="#" className="Logout">
          Logout
        </a>
        <div className="panal">
          <Link to="#" className="notification">
            <MdIcons.MdNotifications />
          </Link>

          <Link to="#" className="settings">
            <AiIcons.AiFillSetting />
          </Link>
        </div>
      </div>

      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <div className="navbar">
            <Link to="#" className="menu-bars-collaps">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <div className="profile">
                <div className="profileImg">
                  <img src={progileImg} className="pic"></img>
                </div>
                <div className="profileDetails">
                  <h2>Chamika</h2>

                  <p>Assosiate</p>
                </div>
              </div>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
