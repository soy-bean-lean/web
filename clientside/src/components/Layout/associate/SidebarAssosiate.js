import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as GIIcons from 'react-icons/gi';

import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Nav,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navItemsProffesional = [
  {
    to: '/dashboard',
    name: 'Dashboard',
    exact: true,
    Icon: MdDashboard,
  },

  {
    to: '/csslcourses',
    name: 'Courses',
    exact: false,
    Icon: FaIcons.FaGraduationCap,
  },
  {
    to: '/csslworkshops',
    name: 'Workshops',
    exact: false,
    Icon: GIIcons.GiTeacher,
  },
  {
    to: '/blogs',
    name: 'Blogs',
    exact: false,
    Icon: FaIcons.FaBloggerB,
  },
    
  // {
  //   to: '/forum',
  //   name: 'Forum',
  //   exact: false,
  //   Icon: AiIcons.AiFillFileText,
  // },
  {
    to: '/jobadvertisements',
    name: 'Jobs',
    exact: false,
    Icon: FaIcons.FaUserAlt,
  },

];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Nav vertical>
            {navItemsProffesional.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
