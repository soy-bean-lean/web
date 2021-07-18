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
    path: '/',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },{
    title: 'CPD Records',
    path: '/cpd',
    icon: <HiIcons.HiDocumentReport />,
    cName: 'nav-text'
  },
  {
    title: 'Course',
    path: '/course',
    icon: <FaIcons.FaGraduationCap />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <AiIcons.AiFillFileText />,
    cName: 'nav-text'
  },
];