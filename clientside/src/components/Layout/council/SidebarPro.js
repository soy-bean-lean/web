import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import * as FaIcons from 'react-icons/fa';
import * as GIIcons from 'react-icons/gi';
import * as HiIcons from 'react-icons/hi';
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

const navItemsCouncil = [
  {
    to: '/dashboard',
    name: 'Dashboard',
    exact: true,
    Icon: MdDashboard,
  },
  {
    to: '/managemembers',
    name: 'Manage Registrations',
    exact: false,
    Icon: HiIcons.HiUser,
  },
  {
    to: '/memberUpgration',
    name: 'Manage Upgrations',
    exact: false,
    Icon: HiIcons.HiUser,
  },
  {
    to: '/cpdapproval/cpdrecords',
    name: 'Manage CPD',
    exact: false,
    Icon: FaIcons.FaGraduationCap,
  },
  {
    to: '/courseapproval/csslcourses',
    name: 'Manage Course',
    exact: false,
    Icon: FaIcons.FaGraduationCap,
  },

  {
    to: '/manageworksops',
    name: 'Manage Workshops',
    exact: false,
    Icon: GIIcons.GiTeacher,
  },
  {
    to: '/reviewblogs',
    name: 'Manage Blogs',
    exact: false,
    Icon: FaIcons.FaBloggerB,
  },
  {
    to: '/jobapplications',
    name: 'Manage Jobs',
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
            {navItemsCouncil.map(({ to, name, exact, Icon }, index) => (
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
