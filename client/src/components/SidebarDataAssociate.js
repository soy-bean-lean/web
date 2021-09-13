import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as SiIcons from  "react-icons/si";
import * as GIIcons from  "react-icons/gi";
import * as HiIcons from  "react-icons/hi";
import * as MdIcons from  "react-icons/md";
export const SidebarDataAssociate = [
  {
    title: 'Dashboard',
    path: '/dashboardA',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Blogs',
    path: '/blogA',
    icon: <FaIcons.FaBloggerB />,
    cName: 'nav-text'
  },
  {
    title: 'Forum',
    path: '/forumA',
    icon: <MdIcons.MdForum />,
    cName: 'nav-text'
  },
  {
    title: 'Course',
    path: '/csslcourses',
    icon: <FaIcons.FaGraduationCap />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reportsA',
    icon: <AiIcons.AiFillFileText />,
    cName: 'nav-text'
  },
  {
    title: 'Jobs',
    path: '/jobA',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  }
  ,{
    title: 'Payments',
    path: '/paymentsA',
    icon: <AiIcons.AiFillDollarCircle />,
    cName: 'nav-text'
  },
];