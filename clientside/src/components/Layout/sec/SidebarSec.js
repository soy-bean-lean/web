import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as SiIcons from 'react-icons/si';
import * as GIIcons from 'react-icons/gi';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import React from 'react';
import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdBorderAll,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdPages,
  MdRadioButtonChecked,
  MdReport,
  MdSend,
  MdStar,
  MdTextFields,
  MdViewCarousel,
  MdViewDay,
  MdViewList,
  MdWeb,
  MdWidgets,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navComponents = [
  {
    to: '/buttons',
    name: 'buttons',
    exact: false,
    Icon: MdRadioButtonChecked,
  },
  {
    to: '/buttongroups',
    name: 'button groups',
    exact: false,
    Icon: MdGroupWork,
  },
  { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
  { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
  {
    to: '/dropdowns',
    name: 'dropdowns',
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
  { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
  { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
  { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
  { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
];

const navContents = [
  { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
  { to: '/job', name: 'Jobs', exact: false, Icon: MdBorderAll },
];

const pageContents = [
  { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
  {
    to: '/login-modal',
    name: 'login modal',
    exact: false,
    Icon: MdViewCarousel,
  },
];

const navItemsProffesional = [
  { 
    to: '/dashboard', 
    name: 'Dashboard', 
    exact: true, 
    Icon: MdDashboard 
  },
  /*{
    to: '/csslmember/cpdrecords',
    name: 'CPD Records',
    exact: false,
    Icon: HiIcons.HiDocumentReport,
  },

  {
    to: '/csslcourses',
    name: 'Courses',
    exact: false,
    Icon: FaIcons.FaGraduationCap,
  },*/

  // { to: '/lecCourse', name: 'Lecturing Courses', exact: false, Icon: FaIcons.FaGraduationCap },
  // { to: '/widgets', name: 'Workshops', exact: false, Icon: GIIcons.GiTeacher  },
  // { to: '/widgets', name: 'Blogs', exact: false, Icon: FaIcons.FaBloggerB },
  // { to: '/widgets', name: 'Forum', exact: false, Icon: AiIcons.AiFillFileText },
  {
    to: '/verifyuser',
    name: 'User Verification',
    exact: false,
    Icon: FaIcons.FaUserAlt,
  },
  {
    to: '/managejobs',
    name: 'Manage Job Vacancies',
    exact: false,
    Icon: FaIcons.FaUserAlt,
  },
  {
    to: '/manageworkshops',
    name: 'Manage Workshops',
    exact: false,
    Icon: GIIcons.GiTeacher,
  },
  {
    to: '/csslmember/managepayements',
    name: 'Memeber Payments',
    exact: false,
    Icon: AiIcons.AiFillDollarCircle,
  },
  // { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },

  { to: '/charts', 
    name: 'Reports', 
    exact: false, 
    Icon: MdReport 
  },
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

            <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
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
            </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default SidebarSec;
