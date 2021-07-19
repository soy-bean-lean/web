import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as SiIcons from  "react-icons/si";
import * as GIIcons from  "react-icons/gi";
import * as HiIcons from  "react-icons/hi";
import * as MdIcons from  "react-icons/md";
export const SidebarDataStudent = [
  {
    title: 'Dashboard',
    path: '/S',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Blogs',
    path: '/blogS',
    icon: <FaIcons.FaBloggerB />,
    cName: 'nav-text'
  },
  {
    title: 'Course',
    path: '/courseS',
    icon: <FaIcons.FaGraduationCap />,
    cName: 'nav-text'
  },
  
  {
    title: 'Forum',
    path: '/forumS',
    icon: <MdIcons.MdForum />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reportsS',
    icon: <AiIcons.AiFillFileText />,
    cName: 'nav-text'
  },{
    title: 'Payments',
    path: '/paymentsS',
    icon: <AiIcons.AiFillDollarCircle />,
    cName: 'nav-text'
  },
];