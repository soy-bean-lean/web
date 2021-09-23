import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';

import * as GIIcons from 'react-icons/gi';

import React from 'react';
import { MdDashboard, MdReport } from 'react-icons/md';
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
    to: '/verifyuser',
    name: 'User Verification',
    exact: false,
    Icon: FaIcons.FaUserAlt,
  },

  {
    to: '/workshop',
    name: 'Manage Workshops',
    exact: false,
    Icon: GIIcons.GiTeacher,
  },
  {
    to: '/managejobs',
    name: 'Manage Jobs',
    exact: false,
    Icon: FaIcons.FaUserAlt,
  },

  // { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },

  { to: '/reports', name: 'Reports', exact: false, Icon: HiIcons.HiOutlineDocumentReport },
];

const bem = bn.create('sidebar');

class SidebarSec extends React.Component {
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

export default SidebarSec;
