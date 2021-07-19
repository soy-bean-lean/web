import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarDataAssociate } from "./SidebarDataAssociate";
import { SidebarDataPro } from "./SidebarDataPro";
import { SidebarDataStudent } from "./SidebarDataStudent";
import { SidebarDataCha } from "./SidebarDataCha";

import "./Navbar.css";
import { IconContext } from "react-icons";
import * as MdIcons from "react-icons/md";
import progileImg from "../imgs/p2.jpg";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  if (props.type == "associate") {
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
                    <h2>{props.name}</h2>

                    <p>{props.type}</p>
                  </div>
                </div>
              </li>

              {SidebarDataAssociate.map((item, index) => {
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
  else if (props.type == "pro") {
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
                    <h2>{props.name}</h2>

                    <p>{props.type}</p>
                  </div>
                </div>
              </li>

              {SidebarDataPro.map((item, index) => {
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
  else if (props.type == "student") {
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
                    <h2>{props.name}</h2>

                    <p>{props.type}</p>
                  </div>
                </div>
              </li>

              {SidebarDataStudent.map((item, index) => {
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
  else if (props.type == "cha") {
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
                    <h2>{props.name}</h2>

                    <p>{props.type}</p>
                  </div>
                </div>
              </li>

              {SidebarDataCha.map((item, index) => {
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
  else if (props.type == "council") {
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
                    <h2>{props.name}</h2>

                    <p>{props.type}</p>
                  </div>
                </div>
              </li>

              {SidebarDataCha.map((item, index) => {
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
  else if (props.type == "sec") {
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
                    <h2>{props.name}</h2>

                    <p>{props.type}</p>
                  </div>
                </div>
              </li>

              {SidebarDataCha.map((item, index) => {
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

}

export default Navbar;
