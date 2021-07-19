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
    path: '/A',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Course',
    path: '/courseA',
    icon: <FaIcons.FaGraduationCap />,
    cName: 'nav-text'
  },
  {
    title: 'Workshops',
    path: '/workshop',
    icon: <GIIcons.GiTeacher />,
    cName: 'nav-text'
  },
  {
    title: 'Blogs',
    path: '/blog',
    icon: <FaIcons.FaBloggerB />,
    cName: 'nav-text'
  },
  {
    title: 'Forum',
    path: '/forum',
    icon: <MdIcons.MdForum />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <AiIcons.AiFillFileText />,
    cName: 'nav-text'
  },
  {
    title: 'Jobs',
    path: '/job',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  }
  ,{
    title: 'Payments',
    path: '/payments',
    icon: <AiIcons.AiFillDollarCircle />,
    cName: 'nav-text'
  },
];