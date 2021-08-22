import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as SiIcons from  "react-icons/si";
import * as GIIcons from  "react-icons/gi";
import * as HiIcons from  "react-icons/hi";
import * as MdIcons from  "react-icons/md";
export const SidebarDataCha = [
    {
        title: 'Dashboard',
        path: '/',
        icon: <AiIcons.AiFillDashboard />,
        cName: 'nav-text'
      },{
        title: 'CPD Records',
        path: '/cpdC',
        icon: <HiIcons.HiDocumentReport />,
        cName: 'nav-text'
      },
      {
        title: 'Course',
        path: '/courseC',
        icon: <FaIcons.FaGraduationCap />,
        cName: 'nav-text'
      },
      {
        title: 'Workshops',
        path: '/workshopC',
        icon: <GIIcons.GiTeacher />,
        cName: 'nav-text'
      },
      {
        title: 'Blogs',
        path: '/blogC',
        icon: <FaIcons.FaBloggerB />,
        cName: 'nav-text'
      },
      {
        title: 'Forum',
        path: '/forumC',
        icon: <MdIcons.MdForum />,
        cName: 'nav-text'
      },
      {
        title: 'Reports',
        path: '/reportsC',
        icon: <AiIcons.AiFillFileText />,
        cName: 'nav-text'
      },{
        title: 'Jobs',
        path: '/job',
        icon: <FaIcons.FaUserAlt />,
        cName: 'nav-text'
      },{
        title: 'Payments',
        path: '/paymentsC',
        icon: <AiIcons.AiFillDollarCircle />,
        cName: 'nav-text'
      }
];