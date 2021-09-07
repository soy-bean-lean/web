import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as SiIcons from  "react-icons/si";
import * as GIIcons from  "react-icons/gi";
import * as HiIcons from  "react-icons/hi";
import * as MdIcons from  "react-icons/md";
export const SidebarDataSec = [
  {
    title: 'Dashboard',
    path: '/dashboardSec',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },

  {
    title: 'Registration Verified',
    path: '/regPending',
    icon: <AiIcons.AiFillFileText />,
    cName: 'nav-text'
  },
  {
    title: 'Add Workshops',
    path: '/addWorkshops',
    icon: <GIIcons.GiTeacher />,
    cName: 'nav-text'
  },  
  {
    title: 'Manage Workshops',
    path: '/manWorkshop',
    icon: <GIIcons.GiTeacher />,
    cName: 'nav-text'
  },
  {
    title: 'Add Job Vacancies',
    path: '/addJob',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Payments',
    path: '/paymentsSec',
    icon: <AiIcons.AiFillDollarCircle />,
    cName: 'nav-text'
  },
];

