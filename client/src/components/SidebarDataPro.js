import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as SiIcons from  "react-icons/si";
import * as GIIcons from  "react-icons/gi";
import * as HiIcons from  "react-icons/hi";
import * as MdIcons from  "react-icons/md";
export const SidebarDataPro = [
  {
    title: 'Dashboard',
    path: '/P',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },{
    title: 'CPD Records',
    path: '/cpdP',
    icon: <HiIcons.HiDocumentReport />,
    cName: 'nav-text'
  },
  {
    title: 'Course',
    path: '/courseP',
    icon: <FaIcons.FaGraduationCap />,
    cName: 'nav-text'
  },
  {
    title: 'Workshops',
    path: '/workshopP',
    icon: <GIIcons.GiTeacher />,
    cName: 'nav-text'
  },
  {
    title: 'Blogs',
    path: '/blogP',
    icon: <FaIcons.FaBloggerB />,
    cName: 'nav-text'
  },
  {
    title: 'Forum',
    path: '/forumP',
    icon: <MdIcons.MdForum />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reportsP',
    icon: <AiIcons.AiFillFileText />,
    cName: 'nav-text'
  },{
    title: 'Jobs',
    path: '/jobP',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  },{
    title: 'Payments',
    path: '/paymentsP',
    icon: <AiIcons.AiFillDollarCircle />,
    cName: 'nav-text'
  },
];