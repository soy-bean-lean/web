import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as SiIcons from  "react-icons/si";
import * as GIIcons from  "react-icons/gi";
import * as HiIcons from  "react-icons/hi";
import * as MdIcons from  "react-icons/md";
export const SidebarDataCouncil = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Approve Registration ',
    path: '/regPendingC',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Approve Course',
    path: '/courseCou',
    icon: <FaIcons.FaGraduationCap />,
    cName: 'nav-text'
  },
  {
    title: 'Approve CPD Activity',
    path: '/cpdCou',
    icon: <FaIcons.FaGraduationCap />,
    cName: 'nav-text'
  },
  {
    title: 'Workshops',
    path: '/workshopCou',
    icon: <GIIcons.GiTeacher />,
    cName: 'nav-text'
  },
  {
    title: 'Review Blogs',
    path: '/blogCou',
    icon: <FaIcons.FaBloggerB />,
    cName: 'nav-text'
  },
  {
    title: 'Job Vacancy',
    path: '/jobCou',
    icon: <MdIcons.MdForum />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reportsCou',
    icon: <AiIcons.AiFillFileText />,
    cName: 'nav-text'
  },{
    title: 'Payments',
    path: '/paymentsCou',
    icon: <AiIcons.AiFillDollarCircle />,
    cName: 'nav-text'
  },
];