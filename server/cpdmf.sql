-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2021 at 07:10 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cpdmf`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `description`) VALUES
(1, 'Data Engineering Workshop Postponed', 'Data Engineering workshop that was scheduled to be conducted CSSL has been postponed. You will be notified of the date in future.'),
(2, 'Data Engineering Workshop Postponed', 'Data Engineering workshop that was scheduled to be conducted CSSL has been postponed. You will be notified of the date in future.');

-- --------------------------------------------------------

--
-- Table structure for table `approvedmember`
--

CREATE TABLE `approvedmember` (
  `id` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `associatemember`
--

CREATE TABLE `associatemember` (
  `memberId` varchar(10) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `blogId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` mediumtext NOT NULL,
  `content` text NOT NULL,
  `publishedDate` varchar(12) NOT NULL,
  `image` varchar(255) NOT NULL,
  `readMin` int(3) NOT NULL,
  `readCount` int(5) NOT NULL,
  `likeCount` int(5) NOT NULL,
  `reviewBy` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`blogId`, `memberId`, `title`, `description`, `content`, `publishedDate`, `image`, `readMin`, `readCount`, `likeCount`, `reviewBy`) VALUES
(30, 'cssl001', 'Design Patterns for Microservices', 'In the previous blog post, we walked over the migration of Monolithic to Microservices architecture. If you haven’t read the previous post yet, I suggest you read that before proceeding with this article.', '<h3><strong>Aggregator Pattern</strong></h3><p>We all know that microservices is designing the application as a collection of independent services. These services may not represent a particular functionality of the application. So, the aggregator pattern invokes several microservices to achieve its functionality. In other words, the aggregator pattern is used to develop aggregator services on top of the services.</p><p>Let’s take an example to understand it properly. Assume we have to design an employee management system. So, the project architecture will end up with a few different services and here I consider four of them.</p><ul><li>Get employee information</li><li>Get attendance information</li><li>Get performance information</li><li>Get project allocation information</li></ul><p>These services alone won’t do anything. So, this application should have the functionality to calculate employee salary. It has to invoke two different services such as employee information and attendance information. These two services should be integrated to implement this functionality. Therefore, we can develop an aggregate service to manipulate these two services and send the response to the client. It is not a much time-wasting thing to implement aggregate service. Assume one day, this company change its business plan. So, their salary calculation should be integrated with the employee performance. Here is the importance of the aggregation pattern. You can simply develop another aggregate service to obtain new functionality. </p>', '2021-9-21', '1632208503954-1_odg1fy4dcyLuPOeVOt16Jg.png', 0, 0, 0, 'cssl003'),
(31, 'cssl001', 'Introduction to Modern JavaScript', 'JavaScript is one of the most popular programming languages in the world.', '<h1>Declaring variables and constants</h1><p>Before ES6, the <code>var</code> keyword is used to declare any kind of variables. But there are multiple issues with this keyword.</p><ul><li>It is not supported for <strong>block scope</strong> variables. In other words, the variable declared with the <code>var</code> keyword is visible throughout the script. So it is difficult to make sure a variable name is not duplicated with the script.</li><li>It doesn&#x27;t have a way to make a <strong>final variable</strong> or <strong>constant</strong>.</li></ul><p>Instead, ES6 introduced two separate keywords called <strong>let</strong> and <strong>const</strong> to manage these difficulties. The <code>let</code> keyword is used to declare variables and it will be visible within the particular scope/ block in the script. </p>', '2021-9-21', '1632208724265-0_OfzhG0Waltg3iLbg.png', 0, 0, 0, 'cssl003'),
(32, 'cssl005', 'Why Monitors are Counterproductive for Coders', 'I quit using an external monitor a year ago and have no remorse whatsoever. On contrary, I feel that I am more flexible and independent in choosing my own working environment than ever.', '<h1>Do I need more code on the screen?</h1><p>The first and foremost reason why external monitors hurt productivity is that they expand the amount of data visible to users. It sounds like an advantage for any kind of work… Until we consider a well-known fact that the average human can keep in short memory a maximum of 5(±2) mental items. The less data we keep in mind — the more focused we are and the easier we can enter the productive flow state. Each variable, condition, for loop, object creation, and a return statement is a mental item.</p><p>One method can contain a lot of statements that need mental focus and from my experience — the less I have on display — the fewer distractions my mind has.</p><p>Let’s consider the method chunk we encounter while going through the legacy codebase: </p><h1>Do I need more data?</h1><p>I agree that it is more comfortable to read logs from a big wide monitor. Or to have front-end and code in separate displays. It is comfy to have visualized metrics or development data handy and easy to look at on the widescreen. But it has a cost. A cost of productivity.</p><p>The first disadvantage is the <strong>switch of focus</strong> — it wastes mental energy. Every time you switch attention from code to logs/docs/web-page/graphs — the brain needs few seconds to “change the tape”.</p><p>The second disadvantage — is to be used to an environment that requires <strong>many devices and cables</strong> vs just one — laptop.</p><p>The third disadvantage, however minor — the amount of <strong>blue light</strong> coming from all the monitors. Blue light tends to be bad for sleep if you work late at night. </p>', '2021-9-21', '1632209689012-0_EXJ61_Tcp0urcb82.jpg', 0, 0, 0, 'cssl003'),
(34, 'cssl005', 'Never use the Dot operator in JavaScript', 'If you’re not destructuring everywhere, you’re doing it wrong.', '<p>Those might seem like a couple of bold statements, but let me explain.</p><p>Firstly, there are many cases where the dot operator is perfectly fine. Knowing <strong>where</strong>, and <strong>why</strong>, is what this article is about. But mostly it is about <strong>destructuring</strong> and why it is much <strong>better</strong> and more <strong>important</strong> than many developers understand.</p><p>Secondly, let’s from the start acknowledge that with ES2019 two <strong>new operators</strong> were introduced to JavaScript: </p>', '2021-9-21', '1632210233606-0_BPKlyTBhSdC-TOL7.jpg', 0, 0, 0, 'cssl003'),
(39, 'cssl001', '5 Python Tricks', '5 Python Tricks That Made Me A Good Python Developer\n', '<p>Three years back when I started as a Python developer, I was writing code by learning from the existing codebase. I was never much of a reader myself. This delayed my progress when it comes to knowing handy python tricks that, if I had known them, would have made me a better developer then.</p><p>Past 6 months, I have invested in reading and practicing Python more than ever. I came across few python tricks that I should have known right from the beginning. I am going to share these tricks in this article. </p>', '2021-9-23', '1632337610762-0_kJJ9B9iAGt_jDCaz.jpg', 0, 0, 0, NULL),
(40, 'cssl004', 'Monolithic to Microservices', 'Microservices', '<p>Inthis article, let’s explore two different architectures which are used to develop large-scale web applications. This can be considered as the evolution of software architecture. But it doesn&#x27;t mean one is the best and the other is useless anymore. If you have worked with enterprise-level projects, you may be heard these terms called Monolithic Applications and Microservices. Since 2013, Martin Fowler’s concept of Microservices was the most trending topic among software architectures. So, It is better to have a good understanding of them. </p>', '2021-9-23', '1632337688768-0_O8cIE_6lvEIHioAC.png', 0, 0, 0, NULL),
(41, 'cssl0019', 'Web Services: SOAP vs REST', 'Web Services', '<h1>Web Services</h1><p>Before talk about SOAP and REST, you should understand the term of web services. Web services are any services offered through the Web-wide standardized protocols(TCP<em>,</em> UDP, HTTP, etc). It can be a client-server application or application component for communication. </p>', '2021-9-23', '1632337955258-0_XTZsEv7CwVrOykiV.png', 0, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blogcomment`
--

CREATE TABLE `blogcomment` (
  `commentId` int(7) NOT NULL,
  `blogId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `date` varchar(15) NOT NULL,
  `replyFor` int(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blogcomment`
--

INSERT INTO `blogcomment` (`commentId`, `blogId`, `memberId`, `type`, `description`, `date`, `replyFor`) VALUES
(19, 31, 'cssl001', '', 'nice work', '2021-9-21', NULL),
(20, 32, 'cssl004', '', 'Nice...', '2021-9-21', NULL),
(22, 34, 'cssl001', '', 'superb!!!!!!!!!!!!!!!', '2021-9-23', NULL),
(23, 30, 'cssl001', '', 'nice blog', '2021-9-23', NULL),
(24, 31, 'cssl001', '', 'good blog...', '2021-9-23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contentaccess`
--

CREATE TABLE `contentaccess` (
  `memberId` varchar(10) NOT NULL,
  `courseId` int(7) NOT NULL,
  `contentId` varchar(20) NOT NULL,
  `startDate` varchar(20) DEFAULT NULL,
  `completeDate` varchar(20) DEFAULT NULL,
  `lastAccess` varchar(20) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `testAttempt` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contentaccess`
--

INSERT INTO `contentaccess` (`memberId`, `courseId`, `contentId`, `startDate`, `completeDate`, `lastAccess`, `status`, `testAttempt`) VALUES
('cssl001', 14, 'cssl0014-01', '2021-09-23', '2021-09-23', '2021-09-23 22:41:04', 'Complete', NULL),
('cssl004', 14, 'cssl0014-01', NULL, NULL, NULL, 'Start', NULL),
('cssl001', 14, 'cssl0014-02', NULL, NULL, NULL, 'Start', NULL),
('cssl004', 14, 'cssl0014-02', NULL, NULL, NULL, 'Enroll', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `councilmember`
--

CREATE TABLE `councilmember` (
  `memberId` varchar(10) NOT NULL,
  `coFlag` int(1) NOT NULL,
  `cmFlag` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `coursecomment`
--

CREATE TABLE `coursecomment` (
  `commentId` int(6) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `contentId` varchar(20) NOT NULL,
  `type` varchar(30) DEFAULT NULL,
  `description` longtext NOT NULL,
  `date` varchar(20) DEFAULT NULL,
  `replyFor` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `coursecontent`
--

CREATE TABLE `coursecontent` (
  `contentId` varchar(20) NOT NULL,
  `contentNo` int(7) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `note` longtext DEFAULT NULL,
  `contentType` varchar(30) DEFAULT NULL,
  `content` varchar(100) DEFAULT NULL,
  `contentOrder` int(11) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `examFlag` varchar(10) DEFAULT NULL,
  `passMark` int(10) DEFAULT NULL,
  `courseId` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `coursecontent`
--

INSERT INTO `coursecontent` (`contentId`, `contentNo`, `title`, `description`, `note`, `contentType`, `content`, `contentOrder`, `status`, `examFlag`, `passMark`, `courseId`) VALUES
('cssl0012-01', 1, 'Java Programming: Solving Problems with Software', 'Learn to code in Java and improve your programming and problem-solving skills. You will learn to design algorithms as well as develop and debug programs.', '<p>This course is part of multiple programs</p><p>This course can be applied to multiple Specializations or Professional Certificates programs. Completing this course will count towards your learning in any of the following programs:</p><ul><li>Java Programming and Software Engineering Fundamentals Specialization</li><li>Object Oriented Programming in Java Specialization </li></ul>', 'Video', 'https://www.youtube.com/watch?v=sSoWYlHwvi0', 1, 'Pending', NULL, NULL, 12),
('cssl0012-02', 2, 'Strings in Java', 'This module begins with a short presentation from Raluca Gordân, an assistant professor in Duke University’s Center for Genomic and Computational Biology, about an important problem genomics scientists encounter regularly: how to identify genes in a strand of DNA.', '<p></p>', 'Video', 'https://www.youtube.com/watch?v=R57pDw5cvGA', 2, 'Pending', NULL, NULL, 12),
('cssl0012-03', 3, 'CSV Files and Basic Statistics in Java ', 'A common format for storing tabular data (any data organized into columns and rows) is in comma separated values (CSV) files. In this module, you will learn how to analyze and manipulate data from multiple CSV data files using a powerful open-source software package: Apache Commons CSV. Using this library will empower you to solve problems that could prove too complex to solve with a spreadsheet. By the end of this module, you will be able to: (1) Use the open-source Apache Commons CSV package in your own Java programs', '<p></p>', 'File', '1632340720449-Lec03.pdf', 3, 'Pending', NULL, NULL, 12),
('cssl0013-01', 1, 'Introduction to react native', 'Welcome to the very start of your React Native journey! If you\'re looking for environment setup instructions, they\'ve moved to their own section. Continue reading for an introduction to the documentation, Native Components, React, and more!', '<p>If you want to build mobile apps for both Android and iOS. What should you learn? The individual native languages for each app i.e, Java for Android and Swift/Objective-C for iOS?, Actually NO. Native Android and iOS development are quite different and can be expensive – first, the language itself is quite different, and second, all the underlying API’s are different – the way of using the GPS is different, the way to create animations is different, the way you make network calls is different.</p><p>We’re always looking for shorter development cycles, quicker time to deployment, and better app performance. And there are so many hybrid mobile frameworks such as NativeScript, React Native, Ionic, Xamarin, PhoneGap, etc.</p><p><strong>React Native:</strong> It is a framework developed by Facebook for creating native-style apps for iOS &amp; Android under one common language, JavaScript. Initially, Facebook only developed React Native to support iOS. However, with its recent support of the Android operating system, the library can now render mobile UIs for both platforms.</p><p><strong>Prerequisite:</strong></p><ul><li>Basic Knowledge of <u>HTML</u>, <u>CSS</u> and <u>JS</u>.</li><li>Basic Knowledge of <u>ReactJS</u>.</li><li>NodeJs should be installed in your system. </li></ul>', 'File', '1632341289066-Lecture 01 (Introduction to React Native).pdf', 1, 'Pending', NULL, NULL, 13),
('cssl0013-02', 2, 'Lecture 02 (Fundamentals of React Native)', '(Fundamentals of React Native', '<p>All code examples below are labeled for reference. They are purely intended to provide examples of concepts. Most of them can be written in a much better way </p>', 'File', '1632341381575-Lecture 02 (Fundamentals of React Native).pdf', 2, 'Pending', NULL, NULL, 13),
('cssl0014-01', 1, 'Basic Electronics For Beginners', 'Basic Electronics For Beginners(Equations)\n', '<p>This beginner&#x27;s area is for anyone starting out in electronics. Learn what tools and parts you will need for starting electronics. Read beginner&#x27;s articles on how to solder, how to use a multimeter and more.</p><p>A good place to start is to read the Start Electronics Now! article which is an introduction to electronics with twenty tutorials. </p>', 'Video', 'https://www.youtube.com/watch?v=uXr4lXYjXuU', 1, 'Approved', NULL, NULL, 14),
('cssl0014-02', 2, 'Ohms Law', 'Series and Parallel Circuits Explained - Voltage Current Resistance Physics - AC vs DC & Ohm\'s Law\n', '<p><strong>Series and Parallel Circuits Explained - Voltage Current Resistance Physics - AC vs DC &amp; Ohm&#x27;s Law</strong></p>', 'Video', 'https://www.youtube.com/watch?v=wejz5s31Cts', 4, 'Approved', NULL, NULL, 14),
('cssl0014-03', 3, 'Electronics Engineering -Analog Output', 'Analog Output', '', 'Video', 'https://www.youtube.com/watch?v=r5ofVIScYSM', 2, 'Pending', NULL, NULL, 14),
('cssl0015-01', 1, 'Lesson 1', 'Angular Basic', '<p>Angular Basic</p>', 'Video', 'https://www.youtube.com/watch?v=23o0evRtrFI', 1, 'Pending', NULL, NULL, 15),
('cssl0017-01', 1, 'Lesson 1', 'Basic ML Concepts ', '<p><em>Aaron Edell is co-founder of</em> <em><u>Machine Box</u></em> <em>— a machine learning startup designed to make it easy to start building things with machine learning.</em> </p>', 'Video', 'https://www.youtube.com/watch?v=4hlSztfaqoI', 1, 'Pending', NULL, NULL, 17),
('cssl0017-02', 2, 'Lessons 2', 'ML | Linear Regression', '<p><strong>Linear Regression</strong> is a machine learning algorithm based on <strong>supervised learning</strong>. It performs a <strong>regression task</strong>. Regression models a target prediction value based on independent variables. It is mostly used for finding out the relationship between variables and forecasting. Different regression models differ based on – the kind of relationship between dependent and independent variables, they are considering and the number of independent variables being used. </p>', 'Video', 'https://www.youtube.com/watch?v=zPG4NjIkCjc', 2, 'Pending', NULL, NULL, 17),
('cssl0018-01', 1, 'What is Spring boot?', 'Java Spring boot ', '<p><strong>Java Spring Boot Framework</strong></p>', 'Video', 'https://www.youtube.com/watch?v=gq4S-ovWVlM', 1, 'Approved', NULL, NULL, 18);

-- --------------------------------------------------------

--
-- Table structure for table `courseenroll`
--

CREATE TABLE `courseenroll` (
  `courseId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `startDate` varchar(20) NOT NULL,
  `lastAccess` varchar(20) DEFAULT NULL,
  `status` varchar(30) NOT NULL,
  `rate` float DEFAULT 0,
  `review` longtext DEFAULT NULL,
  `certifiedDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `courseenroll`
--

INSERT INTO `courseenroll` (`courseId`, `memberId`, `startDate`, `lastAccess`, `status`, `rate`, `review`, `certifiedDate`) VALUES
(11, '', '2021-09-23', '2021-09-23 07:09:46', 'Ongoing', 0, NULL, NULL),
(13, '', '2021-09-23', '2021-09-23 08:15:06', 'Ongoing', 0, NULL, NULL),
(14, '', '2021-09-23', '2021-09-23 07:10:08', 'Ongoing', 0, NULL, NULL),
(14, 'cssl001', '2021-09-23', '2021-09-23 22:29:22', 'Ongoing', 0, NULL, NULL),
(14, 'cssl004', '2021-09-23', '2021-09-23 07:02:50', 'Ongoing', 0, NULL, NULL),
(17, '', '2021-09-23', '2021-09-23 08:09:23', 'Ongoing', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `courseqchoice`
--

CREATE TABLE `courseqchoice` (
  `chId` varchar(20) NOT NULL,
  `qId` varchar(20) NOT NULL,
  `courseId` int(8) NOT NULL,
  `contentId` varchar(20) NOT NULL,
  `choice` varchar(50) NOT NULL,
  `correctFlag` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `courseque`
--

CREATE TABLE `courseque` (
  `qId` varchar(20) NOT NULL,
  `qNum` int(4) NOT NULL,
  `courseId` int(7) NOT NULL,
  `contentId` varchar(20) NOT NULL,
  `qDescription` varchar(50) NOT NULL,
  `marks` int(10) NOT NULL,
  `type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cpdrecords`
--

CREATE TABLE `cpdrecords` (
  `recordId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `type` varchar(30) NOT NULL,
  `proof` varchar(250) NOT NULL,
  `note` longtext DEFAULT NULL,
  `credit` int(10) DEFAULT NULL,
  `recordDate` varchar(20) NOT NULL,
  `approvedBy` varchar(10) DEFAULT NULL,
  `approvedDate` varchar(20) DEFAULT NULL,
  `status` varchar(15) NOT NULL,
  `refId` int(10) DEFAULT NULL,
  `recordType` varchar(25) NOT NULL,
  `recTitle` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cpdrecords`
--

INSERT INTO `cpdrecords` (`recordId`, `memberId`, `type`, `proof`, `note`, `credit`, `recordDate`, `approvedBy`, `approvedDate`, `status`, `refId`, `recordType`, `recTitle`) VALUES
(4, 'cssl001', 'OTHER COURSE', 'This is a proof', 'This is a note', 15, '2021-06-01', '', '0000-00-00', 'Rejected', 0, 'O', 'C,C++'),
(5, 'cssl001', 'CSSL WORKSHOP', 'This is a proof', 'This is a note', 30, '2021-05-21', '', '0000-00-00', 'Approved', 0, 'W', 'Workshop on AI'),
(7, 'cssl001', 'CSSL GUEST LECTURES', 'This is a proof', 'This is a note', 20, '2021-09-06', '', '0000-00-00', 'Pending', 0, 'G', 'Software Testing'),
(8, 'cssl001', 'OTHER WORKSHOP', 'This is a proof', 'This is a note', 30, '2021-09-09', '', '0000-00-00', 'Approved', 0, 'O', 'Node JS'),
(11, 'cssl001', 'CSSL GUEST LECTURES', 'This is a proof', 'This is a note', 25, '2021-05-17', '', '0000-00-00', 'Rejected', 0, 'G', 'Maths Lecture'),
(13, 'cssl001', 'CSSL WORKSHOP', 'This is a proof', 'This is a note', 20, '2021-05-06', '', '0000-00-00', 'Approved', 0, 'W', 'Workshop About ML'),
(14, 'cssl001', 'CSSL WORKSHOP', 'This is a proof', 'This is a note', 20, '2021-05-05', '', '0000-00-00', 'Pending', 0, 'W', 'Computer Gaming Workshop'),
(15, 'cssl001', 'others', '1632360005301-images (1).jpg', 'Angular Course For CPD s', 30, '2021-09-23', 'cssl003', '2021-09-23', 'Approved', 3, 'C', 'Angular Course'),
(19, 'cssl001', 'others', '1632413776698-unnamed.jpg', 'h', 60, '2021-09-23', 'cssl003', '2021-09-23', 'Pending', 1, 'C', 'Electronic Course');

-- --------------------------------------------------------

--
-- Table structure for table `creditinfo`
--

CREATE TABLE `creditinfo` (
  `memberId` varchar(6) NOT NULL,
  `year` year(4) NOT NULL,
  `creditLevel` int(10) NOT NULL,
  `completedCredits` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `csslcourse`
--

CREATE TABLE `csslcourse` (
  `courseId` int(7) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `duration` varchar(15) NOT NULL,
  `durationType` varchar(20) NOT NULL,
  `language` varchar(30) NOT NULL,
  `skillLevel` varchar(50) NOT NULL,
  `credit` float DEFAULT NULL,
  `image` varchar(250) DEFAULT 'courseImage.png',
  `mode` varchar(30) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `conductedBy` varchar(10) NOT NULL,
  `approvedBy` varchar(10) DEFAULT NULL,
  `approvedDate` varchar(20) DEFAULT NULL,
  `noOfInteraction` int(30) DEFAULT 0,
  `noOfEnrollments` int(20) DEFAULT 0,
  `avgRate` float DEFAULT 0,
  `rateCount` int(11) DEFAULT 0,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `csslcourse`
--

INSERT INTO `csslcourse` (`courseId`, `name`, `description`, `duration`, `durationType`, `language`, `skillLevel`, `credit`, `image`, `mode`, `category`, `conductedBy`, `approvedBy`, `approvedDate`, `noOfInteraction`, `noOfEnrollments`, `avgRate`, `rateCount`, `status`) VALUES
(11, 'Introduction to Big Data', 'Interested in increasing your knowledge of the Big Data landscape?  This course is for those new to data science and interested in understanding why the Big Data Era has come to be.  It is for those who want to become conversant with the terminology and the core concepts behind big data problems, applications, and systems.  It is for those who want to start thinking about how Big Data might be useful in their business or career.  It provides an introduction to one of the most common frameworks, Hadoop, that has made big data analysis easier and more accessible -- increasing the potential for data to transform our world!', '17', 'Hours', 'English', 'Beginner', NULL, '1632339805471-images.jpg', 'Online', 'ML and AI', 'cssl001', NULL, NULL, 1, 20, 3.5, 0, 'Approved'),
(12, 'Object Oriented Programming in Java', 'This Specialization is for aspiring software developers with some programming experience in at least one other programming language (e.g., Python, C, JavaScript, etc.) who want to be able to solve more complex problems through objected-oriented design with Java. In addition to learning Java, you will gain experience with two Java development environments (BlueJ and Eclipse), learn how to program with graphical user interfaces, and learn how to design programs capable of managing large amounts of data. These software engineering skills are broadly applicable across wide array of industries.', '15', 'Weeks', 'English', 'Beginner', NULL, '1632340130071-Java.png', 'Online', 'Programming', 'cssl001', NULL, NULL, 0, 15, 2.5, 0, 'OnGoing'),
(13, 'The Complete React Native + Hooks Course', 'Understand React Native with Hooks, Context, and React Navigation.\n', '4', 'Months', 'English', 'Intermediate', NULL, '1632341113222-download (1).png', 'Online', 'Programming', 'cssl001', NULL, NULL, 3, 3, 1, 0, 'Approved'),
(14, 'Electronics Engineering', 'Learn Electronics and PCB Design from the Ground up with Altium CircuitMaker and Labcenter Proteus', '1', 'Months', 'English', 'Advanced', 10, '1632341589252-unnamed.jpg', 'Online', 'Software Engineering', 'CSSL006', 'cssl003', '2021-07-23', 19, 60, 4, 0, 'Approved'),
(15, 'Angular', 'Front End Web Application Development Using Angular', '2', 'Months', 'English', 'Intermediate', NULL, '1632342176172-images (1).jpg', 'Online', 'Web Application Development', 'cssl001', 'cssl003', '2021-09-01', 0, 5, 1, 0, 'OnGoing'),
(16, 'ML and AI For Beginners', 'Mashine Learning Course For University Students', '10', 'Weeks', 'English', 'Beginner', NULL, '1632353859433-images (2).jpg', 'Online', 'ML and AI', 'cssl001', NULL, NULL, 0, 55, 4.5, 0, 'OnGoing'),
(17, 'Machine Learning', 'Machine learning is the science of getting computers to act without being explicitly programmed. In the past decade, machine learning has given us self-driving cars, practical speech recognition, effective web search, and a vastly improved understanding of the human genome. Machine learning is so pervasive today that you probably use it dozens of times a day without knowing it. Many researchers also think it is the best way to make progress towards human-level AI. In this class, you will learn about the most effective machine learning techniques, and gain practice implementing them and getting them to work for yourself. More importantly, you\'ll learn about not only the theoretical underpinnings of learning, but also gain the practical know-how needed to quickly and powerfully apply these techniques to new problems. Finally, you\'ll learn about some of Silicon Valley\'s best practices in innovation as it pertains to machine learning and AI.', '10', 'Weeks', 'English', 'Advanced', NULL, '1632347715284-images (3).jpg', 'Online', 'ML and AI', 'CSSL006', NULL, NULL, 17, 15, 3, 0, 'Approved'),
(18, 'Java OPP', 'Java Basic OOP Course', '4', 'Weeks', 'English', 'Intermediate', 10, '1632369136513-Java.png', 'Online', 'Programming', 'cssl001', 'cssl003', '2021-09-23', 0, 0, 0, 0, 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `csslworkshop`
--

CREATE TABLE `csslworkshop` (
  `wId` int(7) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` longtext NOT NULL,
  `location` longtext NOT NULL,
  `fromDate` varchar(20) NOT NULL,
  `toDate` varchar(20) NOT NULL,
  `duration` int(10) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `qrCode` varchar(255) DEFAULT NULL,
  `credit` int(10) DEFAULT NULL,
  `addBy` int(6) DEFAULT NULL,
  `verifiedBy` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `csslworkshop`
--

INSERT INTO `csslworkshop` (`wId`, `title`, `description`, `location`, `fromDate`, `toDate`, `duration`, `subject`, `image`, `qrCode`, `credit`, `addBy`, `verifiedBy`) VALUES
(18, 'Fraud Detection with Kafka, Flink, and DynamoDB', 'A real-time fraud detection workshop using kafka, flink, and DynamoDB', 'Colombo', '2021-09-23', '2021-09-25', 8, 'AWS', '1632330124054-DynamoDBMSKlogos.jpg', NULL, 5, 2, 'cssl003'),
(19, 'Relaxing Your Mind Workshop', 'We ALL have stress, it’s an unavoidable part of life, but you don’t have to figure out how to manage it all by yourself.  There are ways to feel better. The purpose of this workshop is to teach and practice specific skills for managing stress and anxiety.', 'Skutt Room 105,Genaral Hospital', '2021-10-05', '2021-10-07', 5, 'Mental Health', '1632338496451-download.jpg', NULL, 3, 2, 'cssl003'),
(20, 'Retraining Your Mind', 'In our stress management workshops, one of the key areas of focus in learning to manage your stress is practice of retraining your mind.  One of the goals in retraining your mind is to examine and understand your patterns of thinking.', 'UCSC,4th Floor', '2021-09-26', '2021-09-29', 5, 'Relaxsing', '1632338695356-meditating-in-the-nature-royalty-free-image-953678562-1562083089.jpg', NULL, 5, 2, 'cssl003'),
(24, 'AWS Workshop', 'This website lists workshops created by the teams\nat Amazon Web Services (AWS). Workshops are hands-\non events designed to teach or introduce practical\nskills, techniques, or concepts which you can use \nto solve business problems.', 'Colombo', '2021-09-23', '2021-09-27', 5, 'AWS', '1632370150906-0_EXJ61_Tcp0urcb82.jpg', NULL, 5, 2, 'cssl003'),
(25, 'Workshop ML', 'Machine Learning Workshop', 'UCSC', '2021-10-01', '2021-10-04', 4, 'ML', '1632475972906-images (2).jpg', NULL, NULL, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employmentdetails`
--

CREATE TABLE `employmentdetails` (
  `id` int(10) NOT NULL,
  `userID` int(10) NOT NULL,
  `designation` varchar(10) NOT NULL,
  `companyName` varchar(10) NOT NULL,
  `businessAddress` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employmentdetails`
--

INSERT INTO `employmentdetails` (`id`, `userID`, `designation`, `companyName`, `businessAddress`) VALUES
(30, 22, 'UCSC Membe', 'UNIVERSITY', 'Colombo 07'),
(31, 23, 'UCSC Membe', 'UNIVERSITY', '154/8,Matara'),
(32, 24, 'UCSC Lectu', 'UNIVERSITY', 'UCSC Building Complex, 35 Reid Ave, Colombo 00700'),
(33, 29, 'UCSC Membe', 'UNIVERSITY', 'UCSC Building Complex, 35 Reid Ave, Colombo 00700'),
(34, 30, 'UCSC Stude', 'UNIVERSITY', 'UCSC Building Complex, 35 Reid Ave, Colombo 00700');

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `forumId` int(7) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(50) NOT NULL,
  `publishDate` date NOT NULL,
  `memberId` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `forumanswer`
--

CREATE TABLE `forumanswer` (
  `answerId` int(10) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `forumId` int(8) NOT NULL,
  `date` datetime NOT NULL,
  `answer` varchar(300) NOT NULL,
  `voteCount` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `glapplicant`
--

CREATE TABLE `glapplicant` (
  `gId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `appliedDate` date NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `glselect`
--

CREATE TABLE `glselect` (
  `gId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `selectedBy` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `guestlecture`
--

CREATE TABLE `guestlecture` (
  `gId` int(7) NOT NULL,
  `university` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `addBy` int(6) NOT NULL,
  `credit` int(3) NOT NULL,
  `verifiedBy` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `jobapplicant`
--

CREATE TABLE `jobapplicant` (
  `jvId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `cv` varchar(300) NOT NULL,
  `description` varchar(50) NOT NULL,
  `date` varchar(10) NOT NULL,
  `marks` int(50) NOT NULL,
  `status` varchar(30) NOT NULL,
  `sheet` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jobapplicant`
--

INSERT INTO `jobapplicant` (`jvId`, `memberId`, `cv`, `description`, `date`, `marks`, `status`, `sheet`) VALUES
(2, '14', '1632312066676-cpdmf-payment-report (80).pdf', 'description', '2021-9-22', 100, 'pending', 'req.file.answerSheet;'),
(2, '19', '1632351040537-my-cv (35).pdf', 'WSO2', '2021-9-23', 50, 'pending', 'req.file.answerSheet;'),
(3, '1', '1632369964974-my-cv (37).pdf', 'CodeGen Application', '2021-9-23', 100, 'closed', 'req.file.answerSheet;'),
(4, '4', '1632349398429-my-cv (28).pdf', 'Apply Job From Cambio', '2021-9-23', 100, 'closed', 'req.file.answerSheet;'),
(5, '1', '1632351436957-my-cv (24).pdf', 'Attune', '2021-9-23', 50, 'pending', 'req.file.answerSheet;'),
(5, '19', '1632350931932-my-cv (20).pdf', 'Attune Application', '2021-9-23', 75, 'closed', 'req.file.answerSheet;'),
(6, '1', '1632350060516-my-cv (29).pdf', 'Cambio Application', '2021-9-23', 50, 'pending', 'req.file.answerSheet;'),
(8, '19', '1632351110773-my-cv (35).pdf', 'Imara Application', '2021-9-23', 0, 'closed', 'req.file.answerSheet;'),
(9, '4', '1632351343102-my-cv (29).pdf', '99X', '2021-9-23', 50, 'pending', 'req.file.answerSheet;');

-- --------------------------------------------------------

--
-- Table structure for table `jobquestions`
--

CREATE TABLE `jobquestions` (
  `Qnumber` int(11) NOT NULL,
  `Question` longtext NOT NULL,
  `Answer1` longtext NOT NULL,
  `Answer2` longtext NOT NULL,
  `Answer3` longtext NOT NULL,
  `Answer4` longtext NOT NULL,
  `Correct` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobquestions`
--

INSERT INTO `jobquestions` (`Qnumber`, `Question`, `Answer1`, `Answer2`, `Answer3`, `Answer4`, `Correct`, `type`) VALUES
(1, 'What is not a OOP Consept?         ', 'Abstraction        ', 'Polymorphism        ', 'static        ', 'Encapsulation        ', 3, 'OOP '),
(2, ' What is the first step in the software development life cycle? ', 'System Design   ', 'Preliminary Investigation and Analysis    ', 'System Testing    ', 'Coding   ', 1, 'SDLC'),
(4, 'What is the major drawback of the Spiral Model?', 'What is the major drawback of the Spiral Model?', 'Doesn\'t work well for smaller projects', 'Additional functionalities are added later on', 'Strong approval and documentation control', 4, 'SDLC'),
(5, 'CSS stands for,     ', 'Cascade style sheets     ', 'Color and style sheets     ', 'Cascading style sheets     ', 'None of the above     ', 3, 'OOP '),
(6, 'Which of the following does not have a body?  ', 'An Interface  ', ' A Class  ', 'An Abstract Method  ', 'None of above  ', 3, 'OOP '),
(7, 'In OOP public, private & protected are?  ', ' Classes  ', ' Access Modifiers  ', ' Interfaces  ', ' Method signature  ', 2, 'OOP '),
(8, 'Which of the following is an abstract data type?  ', ' Double  ', ' String  ', ' Int  ', ' Class  ', 4, 'OOP '),
(9, '\nWhich of the following is not the member of class?   ', 'Static function  ', ' Friend function  ', ' Const function  ', ' Virtual function  ', 1, 'OOP '),
(10, 'Which of the following are the advantages of React.js?', 'React.js can increase the application\'s performance with Virtual DOM.', 'React.js is easy to integrate with other frameworks such as Angular, BackboneJS since it is only a view library.', 'React.js can render both on client and server side.', 'All of the above', 4, 'React');

-- --------------------------------------------------------

--
-- Table structure for table `jobvacancy`
--

CREATE TABLE `jobvacancy` (
  `jvId` int(7) NOT NULL,
  `companyName` varchar(50) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `contact` varchar(12) NOT NULL,
  `email` longtext NOT NULL,
  `description` text NOT NULL,
  `advertisment` varchar(300) NOT NULL,
  `location` varchar(20) NOT NULL,
  `addBy` int(10) DEFAULT NULL,
  `activity` varchar(15) NOT NULL,
  `questionCount` int(11) NOT NULL,
  `questionType` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jobvacancy`
--

INSERT INTO `jobvacancy` (`jvId`, `companyName`, `designation`, `contact`, `email`, `description`, `advertisment`, `location`, `addBy`, `activity`, `questionCount`, `questionType`) VALUES
(2, 'WSO2                   ', 'SE-Intern                   ', '0112365487  ', 'wso2@ws.com          ', 'WSO2   ', 'WSO2.png', 'Colombo 4           ', 2, 'open', 2, 'OOP           '),
(3, 'CodeGen International (Pvt) Ltd            ', 'DA-Intern            ', ' 0117896548 ', 'codegen@cdg.com    ', '     CodeGen International (Pvt) Ltd            ', 'CodeGen International (Pvt) Ltd.png', 'Colombo 5           ', 2, 'close', 4, 'OOP    '),
(4, 'Creative Software         ', 'SE-Intern         ', '0718559887  ', 'chamikadeshan1997@gmail.com    ', 'Creative Software         ', 'Creative Software.png', 'Colombo 7         ', 2, 'open', 2, 'OOP     '),
(5, 'Attune Lanka (Pvt) Limited     ', 'SE-Intern     ', '0112559368  ', 'attune@atn.com ', 'Attune Lanka (Pvt) Limited     ', 'Attune Lanka (Pvt) Limited.png', 'Colombo 4     ', 2, 'close', 4, 'OOP     '),
(6, 'Cambio Software Engineering      ', 'SE-Intern      ', '      ', 'chamikadeshan1997@gmail.com      ', 'Cambio Software Engineering      ', 'Cambio Software Engineering.png', 'Baththaramulla      ', 2, 'open', 4, 'OOP      '),
(8, 'Imara Software Solutions (Private) Limited      ', 'SE-Intern      ', '0148775998  ', 'chamikadeshan1997@gmail.com  ', 'Imara Software Solutions (Private) Limited      ', 'Imara Software Solutions (Private) Limited.png', 'Baththaramulla      ', 2, 'close', 4, 'OOP  '),
(9, '99X      ', 'SE-Intern      ', '0718556559  ', 'chamikadeshan1997@gmail.com ', '      ', '99x.png', 'Colombo 4      ', 2, 'open', 4, 'OOP      '),
(13, 'Avonet Technologies        ', 'SE - Intern        ', '071235696   ', 'avonet@gamil.com        ', 'Avonet Technologies     ', '1631206532172-avone21.jpg', 'Rajagiriya        ', 2, 'open', 4, 'OOP '),
(22, 'X - Venture    ', 'SE-Intern ', '0718553224  ', 'chamikadeshan97@gmail.com    ', 'X- Venture    ', '1631791478080-Arimac Lanka.png', 'Colombo    ', 2, 'open', 2, 'SDLC    ');

-- --------------------------------------------------------

--
-- Table structure for table `logindetais`
--

CREATE TABLE `logindetais` (
  `memberNo` varchar(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `logininfo`
--

CREATE TABLE `logininfo` (
  `id` int(10) NOT NULL,
  `un` varchar(50) NOT NULL,
  `pw` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logininfo`
--

INSERT INTO `logininfo` (`id`, `un`, `pw`) VALUES
(1, 'pro@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve'),
(2, 'sec@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve'),
(3, 'council@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve'),
(4, 'associate@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve'),
(5, 'anushka.darshana01@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve'),
(19, 'cha@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve'),
(22, 'sandunikananayakkara@gmail.com', '$2b$10$sw5tQIeMkp2ouYKqu/uczuTvzsWujBffGHAN95BqHO87XUnAH47uC'),
(23, '2018cs071@stu.ucsc.cmb.ac.lk', '$2b$10$yA9.oemv7EGAMLC/aOqDfetgYsJQshG4e.h/.scaQ9PB2Uucmw7y6'),
(24, 'deshjayasingha@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve'),
(29, 'deshjayasingha@gmail.com', '$2b$10$UzdrIxiMDru8EZ3d/rDyJu4JPTjvibffpQyGFZ9kYD4l6sWGg06Yi'),
(30, 'std@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `memberType` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `memberId`, `memberType`) VALUES
(1, 'cssl001', 'professional'),
(2, 'cssl002', 'secretariat'),
(3, 'cssl003', 'council'),
(4, 'cssl004', 'associate'),
(5, 'cssl005', 'student'),
(19, 'CSSL006', 'chartered'),
(23, 'CSSL007', 'chartered'),
(24, 'cssl0024', 'professional'),
(29, 'cssl0029', 'professional');

-- --------------------------------------------------------

--
-- Table structure for table `memberjob`
--

CREATE TABLE `memberjob` (
  `jobId` int(7) NOT NULL,
  `companyName` varchar(30) NOT NULL,
  `designation` varchar(40) NOT NULL,
  `postolNo` int(10) NOT NULL,
  `street` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `contact` int(10) NOT NULL,
  `email` varchar(40) NOT NULL,
  `fax` varchar(40) NOT NULL,
  `memberId` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `memberlogin`
--

CREATE TABLE `memberlogin` (
  `username` varchar(30) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `officer`
--

CREATE TABLE `officer` (
  `id` int(6) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `officerType` varchar(50) NOT NULL,
  `addBy` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `officerlogin`
--

CREATE TABLE `officerlogin` (
  `username` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `officerId` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `othercourse`
--

CREATE TABLE `othercourse` (
  `courseId` int(7) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `platform` varchar(20) DEFAULT NULL,
  `skillLevel` varchar(40) NOT NULL,
  `mode` varchar(50) NOT NULL,
  `durationValue` int(7) NOT NULL,
  `durationType` varchar(50) NOT NULL,
  `subject` varchar(30) DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `partner` varchar(250) DEFAULT NULL,
  `approvedBy` varchar(20) DEFAULT NULL,
  `approvedDate` varchar(20) DEFAULT NULL,
  `credit` int(10) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `othercourse`
--

INSERT INTO `othercourse` (`courseId`, `name`, `description`, `platform`, `skillLevel`, `mode`, `durationValue`, `durationType`, `subject`, `category`, `partner`, `approvedBy`, `approvedDate`, `credit`, `status`) VALUES
(1, 'Java Beginner', 'Java Course for Beginners', 'Coursera', 'Beginner', 'Online Course', 3, 'Months', 'Java Programming', 'SE', 'London Metropolitan University', 'cssl001', '2021-08-15', 10, 'Approved'),
(2, 'DiTEC', 'Fundamental of Programming, Software Engineering, ', 'Udemy', 'Beginner', 'Onsite Course', 5, 'Months', 'Programming', 'Programming', 'Esoft Metro Campus', 'cssl003', '2021-08-20', 10, 'Approved'),
(3, 'Angular Beginner', 'Angular Course for Beginners', 'Udemy', 'Intermediate', 'Online Course', 1, 'Months', 'Angular Programming', 'SE', 'IIT', 'cssl001', '2021-08-15', 15, 'Approved'),
(4, 'Angular', 'Angular for Beginners', 'Udemy', 'Beginner', 'Online Course', 2, 'Months', 'Programming', 'SE', 'London University', 'cssl003', '2021-09-12', 5, 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `otherworkshop`
--

CREATE TABLE `otherworkshop` (
  `owId` int(7) NOT NULL,
  `title` varchar(100) NOT NULL,
  `fromDate` varchar(20) DEFAULT NULL,
  `toDate` varchar(20) DEFAULT NULL,
  `duration` float DEFAULT NULL,
  `durationType` varchar(10) DEFAULT NULL,
  `subject` varchar(50) DEFAULT NULL,
  `credit` float DEFAULT NULL,
  `conductedBy` varchar(10) DEFAULT NULL,
  `approvedBy` varchar(10) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `otherworkshop`
--

INSERT INTO `otherworkshop` (`owId`, `title`, `fromDate`, `toDate`, `duration`, `durationType`, `subject`, `credit`, `conductedBy`, `approvedBy`, `status`) VALUES
(1, 'Robotics', '2021-08-31', '2021-09-04', 5, 'Days', NULL, 1, 'IEEE', 'cssl003', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `paymentID` int(7) NOT NULL,
  `year` varchar(50) NOT NULL,
  `payDate` varchar(20) NOT NULL DEFAULT current_timestamp(),
  `amount` int(10) NOT NULL,
  `type` varchar(20) NOT NULL,
  `memberId` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`paymentID`, `year`, `payDate`, `amount`, `type`, `memberId`) VALUES
(23, '2021', '2021-09-22', 1500, 'Proffessional', 'CSSL002'),
(24, '2021', '2021-09-22', 1000, 'Proffessional', 'CSSL002'),
(25, '2021', '2021-09-22 17:26:50', 1500, 'professional', 'CSSL006'),
(26, '2021', '2021-09-23 00:15:59', 500, 'student', 'CSSL006'),
(27, '2021', '2021-09-23 02:13:38', 2000, 'chartered', 'CSSL007'),
(28, '2021', '2021-09-23 09:18:58', 1500, 'professional', 'cssl0029'),
(29, '2021', '2021-09-24 11:13:37', 1500, 'professional', 'cssl0024');

-- --------------------------------------------------------

--
-- Table structure for table `professionalmember`
--

CREATE TABLE `professionalmember` (
  `memberId` varchar(10) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `previousFlag` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `recentactivities`
--

CREATE TABLE `recentactivities` (
  `id` int(10) NOT NULL,
  `memberID` varchar(10) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recentactivities`
--

INSERT INTO `recentactivities` (`id`, `memberID`, `title`, `description`) VALUES
(11, 'cssl001', 'Add  a Blog', 'New Blog about 2 for   on 2021-9-22'),
(12, 'cssl004', 'Apply To a Job', 'Apply a Job From  CodeGen International (Pvt) Ltd     for DA-Intern      on 2021-9-22'),
(13, 'cssl001', 'Apply To a Job', 'Apply a Job From  CodeGen International (Pvt) Ltd     for DA-Intern      on 2021-9-22'),
(14, 'cssl0011', 'Apply To a Job', 'Apply a Job From  Creative Software       for SE-Intern        on 2021-9-22'),
(15, 'cssl001', 'Apply To a Job', 'Apply a Job From  WSO2           for SE-Intern            on 2021-9-22'),
(16, 'cssl001', 'Apply To a Job', 'Apply a Job From  Arimac Lanka                              for SE-Intern                               on 2021-9-22'),
(17, 'cssl004', 'Apply To a Job', 'Apply a Job From  WSO2           for SE-Intern            on 2021-9-22'),
(18, 'cssl0014', 'Apply To a Job', 'Apply a Job From  WSO2                 for SE-Intern                  on 2021-9-22'),
(19, 'cssl001', 'Add  a Blog', 'New Blog about 2 for   on 2021-9-22'),
(20, 'cssl001', 'Add  a Blog', 'New Blog about 5 Python Tricks for   on 2021-9-23'),
(21, 'cssl004', 'Add  a Blog', 'New Blog about Monolithic to Microservices for   on 2021-9-23'),
(22, 'cssl0019', 'Add  a Blog', 'New Blog about Web Services: SOAP vs REST for   on 2021-9-23'),
(23, 'cssl004', 'Apply To a Job', 'Apply a Job From  Creative Software         for SE-Intern          on 2021-9-23'),
(24, 'cssl001', 'Apply To a Job', 'Apply a Job From  Cambio Software Engineering      for SE-Intern       on 2021-9-23'),
(25, 'cssl0019', 'Apply To a Job', 'Apply a Job From  Attune Lanka (Pvt) Limited     for SE-Intern      on 2021-9-23'),
(26, 'cssl0019', 'Apply To a Job', 'Apply a Job From  WSO2                  for SE-Intern                   on 2021-9-23'),
(27, 'cssl0019', 'Apply To a Job', 'Apply a Job From  Imara Software Solutions (Private) Limited     for SE-Intern      on 2021-9-23'),
(28, 'cssl004', 'Apply To a Job', 'Apply a Job From  WSO2                  for SE-Intern                   on 2021-9-23'),
(29, 'cssl004', 'Apply To a Job', 'Apply a Job From  99X     for SE-Intern      on 2021-9-23'),
(30, 'cssl001', 'Apply To a Job', 'Apply a Job From  Attune Lanka (Pvt) Limited      for SE-Intern       on 2021-9-23'),
(31, 'cssl001', 'Apply To a Job', 'Apply a Job From  CodeGen International (Pvt) Ltd            for DA-Intern             on 2021-9-23');

-- --------------------------------------------------------

--
-- Table structure for table `referee`
--

CREATE TABLE `referee` (
  `refId` int(7) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `designation` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contact` int(10) NOT NULL,
  `id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `studentmember`
--

CREATE TABLE `studentmember` (
  `memberId` varchar(10) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `testinfo`
--

CREATE TABLE `testinfo` (
  `testId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `contentId` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `marks` int(10) NOT NULL,
  `attempNo` int(10) NOT NULL,
  `answerSheet` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `tokenID` int(10) NOT NULL,
  `userID` int(10) NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(6) NOT NULL,
  `title` varchar(10) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `nic` varchar(15) DEFAULT NULL,
  `residentialAddress` longtext NOT NULL,
  `contactNumber` varchar(12) NOT NULL,
  `birthDate` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `userType` varchar(40) NOT NULL,
  `registeredDate` varchar(15) NOT NULL DEFAULT current_timestamp(),
  `status` int(2) NOT NULL,
  `veryfiedBy` varchar(20) DEFAULT NULL,
  `approvedBy` varchar(15) DEFAULT NULL,
  `profileImage` longtext DEFAULT 'profile.png',
  `paymentStatus` int(11) NOT NULL,
  `userProof` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `title`, `firstName`, `lastName`, `nic`, `residentialAddress`, `contactNumber`, `birthDate`, `email`, `password`, `userType`, `registeredDate`, `status`, `veryfiedBy`, `approvedBy`, `profileImage`, `paymentStatus`, `userProof`) VALUES
(1, 'Miss', 'Jihani           ', 'Nanaykkara           ', '973122878V  ', 'No 13/6, Baron waidya rathna mawatha uyanwatra matara', '0703218269 ', '2021-02-16', 'pro@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve', 'professional', '2021-02-05', 1, '2', '3', '1631870126348-1631274767078-WhatsApp Image 2021-07-24 at 6.12.06 PM.jpeg', 1, ''),
(2, 'Mr', 'Supun', 'Nanayakkara ', '973122983V  ', 'Galle ', '07645895 ', '2021-05-07', 'sec@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve', 'secretariat', '2020-07-09', 0, '', NULL, '1631365692556-council.jpeg', 1, ''),
(3, 'Mrs', 'Sudeshi  ', 'Uthpala  ', '973162983V', 'Colombo  ', '0715279016  ', '2021-08-03', 'council@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve', 'council', '2020-09-06', 2, '', NULL, '1631997407303-WhatsApp Image 2021-09-11 at 2.53.02 PM.jpeg', 1, ''),
(4, 'Mr', 'Chamika   ', 'Jayasingha ', '973122983V  ', '154/8 , Elawella Road, Hiththetiya East , Hiththetiya , Matara  ', '0718553224 ', '1997-11-07', 'associate@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve', 'associate', '2021-07-06', 1, '2', '3', '1631873663590-1631873425355-1631214541380-WhatsApp Image 2020-07-17 at 7.00.45 PM.jpeg', 1, ''),
(19, 'Mrs', 'Kasuni', 'Jayasingha', '111112233V', '154/8', '0718553224', '2003-09-01', 'cha@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve', 'chartered', '2021-04-22', 3, '2', '3', '1632336683546-1631887511302-IMG_20190820_105940350.jpg', 1, ''),
(22, 'Mrs', 'Sandunika', 'Nanayakkara', '873815583V', '154/8', '0718553224', '2003-09-01', 'sandunikananayakkara@gmail.com', '$2b$10$sw5tQIeMkp2ouYKqu/uczuTvzsWujBffGHAN95BqHO87XUnAH47uC', 'associate', '2021-02-22', 2, NULL, '2', 'profile.png', 0, '1632335325889-18000711 (3).zip'),
(24, 'Mr', 'Kumar', 'Jayasingha', '849764258V', 'Colombo 07', '0758978645', '1984-07-11', 'deshjayasingha@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve', 'professional', '2021-08-23', 1, '2', '3', 'profile.png', 1, '1632335910437-jcpro400.zip'),
(29, 'Mr', 'Chamika', 'Deshan', '973123683V', '154/8', '0718553224', '1997-07-12', 'deshjayasingha@gmail.om', '$2b$10$UzdrIxiMDru8EZ3d/rDyJu4JPTjvibffpQyGFZ9kYD4l6sWGg06Yi', 'professional', '2021-09-23', 1, '2', '3', 'profile.png', 1, '1632344662653-widgetkit_2.9.19.zip'),
(30, 'Mr', 'Anushka', 'Darshana', '971503548V', 'Badulla', '0714559886', '1997-05-29', 'std@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve', 'student', '2021-09-23 05:2', 1, '2', '3', '1632355258274-graduate.png', 1, '1632355027304-rishier827-master.zip');

-- --------------------------------------------------------

--
-- Table structure for table `userupgrade`
--

CREATE TABLE `userupgrade` (
  `id` int(11) NOT NULL,
  `memberId` varchar(20) NOT NULL,
  `title` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `contactNumber` int(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `currentStatus` varchar(25) NOT NULL,
  `requestedStatus` varchar(25) NOT NULL,
  `date` varchar(20) NOT NULL,
  `activity` int(11) NOT NULL DEFAULT 0,
  `proof` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userupgrade`
--

INSERT INTO `userupgrade` (`id`, `memberId`, `title`, `firstName`, `lastName`, `contactNumber`, `email`, `currentStatus`, `requestedStatus`, `date`, `activity`, `proof`) VALUES
(4, 'cssl004', '', 'Chamika   ', 'Jayasingha ', 0, 'associate@gmail.com', 'associate', 'professional', '', 0, '1632418589066-CantimaProject.zip');

-- --------------------------------------------------------

--
-- Table structure for table `workshopconduct`
--

CREATE TABLE `workshopconduct` (
  `wId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `workshopconduct`
--

INSERT INTO `workshopconduct` (`wId`, `memberId`, `date`) VALUES
(18, 'cssl003', '2021-09-23'),
(18, 'cssl004', '2021-09-24'),
(19, 'cssl001', '2021-10-06'),
(20, 'cssl001', '2021-09-26'),
(21, 'cssl003', '2021-09-27'),
(22, 'cssl0029', '2021-09-25'),
(23, 'cssl0019', '2021-09-28'),
(23, 'cssl0023', '2021-09-28'),
(23, 'cssl0024', '2021-09-26'),
(23, 'cssl0029', '2021-09-25'),
(24, 'cssl0029', '2021-09-25'),
(25, 'cssl004', '');

-- --------------------------------------------------------

--
-- Table structure for table `workshopparticipate`
--

CREATE TABLE `workshopparticipate` (
  `wId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `workshopreg`
--

CREATE TABLE `workshopreg` (
  `wId` int(7) NOT NULL,
  `memberId` varchar(10) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `approvedmember`
--
ALTER TABLE `approvedmember`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mid_approved` (`memberId`);

--
-- Indexes for table `associatemember`
--
ALTER TABLE `associatemember`
  ADD PRIMARY KEY (`memberId`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blogId`) USING BTREE,
  ADD KEY `fk_mid_blog` (`memberId`),
  ADD KEY `fk_reviewby_blog` (`reviewBy`);

--
-- Indexes for table `blogcomment`
--
ALTER TABLE `blogcomment`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `fk_mid_bcomm` (`memberId`),
  ADD KEY `fk_reply_bcomm` (`replyFor`),
  ADD KEY `blogId` (`blogId`);

--
-- Indexes for table `contentaccess`
--
ALTER TABLE `contentaccess`
  ADD PRIMARY KEY (`contentId`,`courseId`,`memberId`),
  ADD KEY `fk_mid_con_acc` (`memberId`),
  ADD KEY `fk_course_id` (`courseId`);

--
-- Indexes for table `councilmember`
--
ALTER TABLE `councilmember`
  ADD PRIMARY KEY (`memberId`);

--
-- Indexes for table `coursecomment`
--
ALTER TABLE `coursecomment`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `fk_mid_com` (`memberId`),
  ADD KEY `fk_cid_com` (`contentId`),
  ADD KEY `fk_reply_comm` (`replyFor`);

--
-- Indexes for table `coursecontent`
--
ALTER TABLE `coursecontent`
  ADD PRIMARY KEY (`contentId`,`courseId`),
  ADD KEY `fk_cid_content` (`courseId`);

--
-- Indexes for table `courseenroll`
--
ALTER TABLE `courseenroll`
  ADD PRIMARY KEY (`courseId`,`memberId`),
  ADD KEY `fk_mid_enroll` (`memberId`);

--
-- Indexes for table `courseqchoice`
--
ALTER TABLE `courseqchoice`
  ADD PRIMARY KEY (`chId`),
  ADD KEY `fk_qid_ch` (`qId`),
  ADD KEY `fk_content_ch` (`contentId`),
  ADD KEY `fk_course_ch` (`courseId`);

--
-- Indexes for table `courseque`
--
ALTER TABLE `courseque`
  ADD PRIMARY KEY (`qId`),
  ADD KEY `fk_course_que` (`courseId`),
  ADD KEY `fk_content_que` (`contentId`);

--
-- Indexes for table `cpdrecords`
--
ALTER TABLE `cpdrecords`
  ADD PRIMARY KEY (`recordId`),
  ADD KEY `fk_mid_cpd` (`memberId`),
  ADD KEY `fk_appby_cpd` (`approvedBy`);

--
-- Indexes for table `creditinfo`
--
ALTER TABLE `creditinfo`
  ADD PRIMARY KEY (`memberId`,`year`);

--
-- Indexes for table `csslcourse`
--
ALTER TABLE `csslcourse`
  ADD PRIMARY KEY (`courseId`),
  ADD KEY `fk_conduct_cc` (`conductedBy`),
  ADD KEY `fk_approved_cc` (`approvedBy`);

--
-- Indexes for table `csslworkshop`
--
ALTER TABLE `csslworkshop`
  ADD PRIMARY KEY (`wId`),
  ADD KEY `fk_very_cw` (`verifiedBy`),
  ADD KEY `fk_add_cw` (`addBy`);

--
-- Indexes for table `employmentdetails`
--
ALTER TABLE `employmentdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`forumId`),
  ADD KEY `fk_mid_forum` (`memberId`);

--
-- Indexes for table `forumanswer`
--
ALTER TABLE `forumanswer`
  ADD PRIMARY KEY (`answerId`,`forumId`),
  ADD KEY `fk_mid_fans` (`memberId`),
  ADD KEY `fk_fid_fans` (`forumId`);

--
-- Indexes for table `glapplicant`
--
ALTER TABLE `glapplicant`
  ADD PRIMARY KEY (`gId`,`memberId`),
  ADD KEY `fk_mid_gapp` (`memberId`);

--
-- Indexes for table `glselect`
--
ALTER TABLE `glselect`
  ADD PRIMARY KEY (`gId`,`memberId`,`selectedBy`),
  ADD KEY `fk_mid_gselect` (`memberId`),
  ADD KEY `fk_seby_gselect` (`selectedBy`);

--
-- Indexes for table `guestlecture`
--
ALTER TABLE `guestlecture`
  ADD PRIMARY KEY (`gId`),
  ADD KEY `fk_verify_gl` (`verifiedBy`),
  ADD KEY `fk_add_gl` (`addBy`);

--
-- Indexes for table `jobapplicant`
--
ALTER TABLE `jobapplicant`
  ADD PRIMARY KEY (`jvId`,`memberId`),
  ADD KEY `fk_mid_japp` (`memberId`);

--
-- Indexes for table `jobquestions`
--
ALTER TABLE `jobquestions`
  ADD PRIMARY KEY (`Qnumber`);

--
-- Indexes for table `jobvacancy`
--
ALTER TABLE `jobvacancy`
  ADD PRIMARY KEY (`jvId`);

--
-- Indexes for table `logindetais`
--
ALTER TABLE `logindetais`
  ADD PRIMARY KEY (`memberNo`);

--
-- Indexes for table `logininfo`
--
ALTER TABLE `logininfo`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `member_id` (`memberId`);

--
-- Indexes for table `memberjob`
--
ALTER TABLE `memberjob`
  ADD PRIMARY KEY (`memberId`,`jobId`);

--
-- Indexes for table `memberlogin`
--
ALTER TABLE `memberlogin`
  ADD PRIMARY KEY (`username`),
  ADD KEY `fk_mid_login` (`memberId`);

--
-- Indexes for table `officer`
--
ALTER TABLE `officer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_admin_officer` (`addBy`);

--
-- Indexes for table `officerlogin`
--
ALTER TABLE `officerlogin`
  ADD PRIMARY KEY (`username`),
  ADD KEY `fk_officer_login` (`officerId`);

--
-- Indexes for table `othercourse`
--
ALTER TABLE `othercourse`
  ADD PRIMARY KEY (`courseId`),
  ADD KEY `fk_approve_oc` (`approvedBy`);

--
-- Indexes for table `otherworkshop`
--
ALTER TABLE `otherworkshop`
  ADD PRIMARY KEY (`owId`),
  ADD KEY `ow_approved_id` (`approvedBy`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`paymentID`);

--
-- Indexes for table `professionalmember`
--
ALTER TABLE `professionalmember`
  ADD PRIMARY KEY (`memberId`);

--
-- Indexes for table `recentactivities`
--
ALTER TABLE `recentactivities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `referee`
--
ALTER TABLE `referee`
  ADD PRIMARY KEY (`id`,`refId`);

--
-- Indexes for table `studentmember`
--
ALTER TABLE `studentmember`
  ADD PRIMARY KEY (`memberId`);

--
-- Indexes for table `testinfo`
--
ALTER TABLE `testinfo`
  ADD PRIMARY KEY (`testId`),
  ADD KEY `fk_mid_test` (`memberId`),
  ADD KEY `fk_cid_test` (`contentId`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`tokenID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nic` (`nic`);

--
-- Indexes for table `userupgrade`
--
ALTER TABLE `userupgrade`
  ADD PRIMARY KEY (`id`,`memberId`,`currentStatus`) USING BTREE;

--
-- Indexes for table `workshopconduct`
--
ALTER TABLE `workshopconduct`
  ADD PRIMARY KEY (`wId`,`memberId`,`date`),
  ADD KEY `fk_mid_conduct` (`memberId`);

--
-- Indexes for table `workshopparticipate`
--
ALTER TABLE `workshopparticipate`
  ADD PRIMARY KEY (`wId`,`memberId`),
  ADD KEY `fk_mid_wpartici` (`memberId`);

--
-- Indexes for table `workshopreg`
--
ALTER TABLE `workshopreg`
  ADD PRIMARY KEY (`wId`,`memberId`),
  ADD KEY `fk_mid_wreg` (`memberId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `approvedmember`
--
ALTER TABLE `approvedmember`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `blogId` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `blogcomment`
--
ALTER TABLE `blogcomment`
  MODIFY `commentId` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `cpdrecords`
--
ALTER TABLE `cpdrecords`
  MODIFY `recordId` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `csslcourse`
--
ALTER TABLE `csslcourse`
  MODIFY `courseId` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `csslworkshop`
--
ALTER TABLE `csslworkshop`
  MODIFY `wId` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `employmentdetails`
--
ALTER TABLE `employmentdetails`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `guestlecture`
--
ALTER TABLE `guestlecture`
  MODIFY `gId` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobquestions`
--
ALTER TABLE `jobquestions`
  MODIFY `Qnumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `jobvacancy`
--
ALTER TABLE `jobvacancy`
  MODIFY `jvId` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `officer`
--
ALTER TABLE `officer`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otherworkshop`
--
ALTER TABLE `otherworkshop`
  MODIFY `owId` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `paymentID` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `recentactivities`
--
ALTER TABLE `recentactivities`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `tokenID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `approvedmember`
--
ALTER TABLE `approvedmember`
  ADD CONSTRAINT `fk_mid_approved` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `associatemember`
--
ALTER TABLE `associatemember`
  ADD CONSTRAINT `fk_ass_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `blogcomment`
--
ALTER TABLE `blogcomment`
  ADD CONSTRAINT `blogcomment_ibfk_1` FOREIGN KEY (`blogId`) REFERENCES `blog` (`blogId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contentaccess`
--
ALTER TABLE `contentaccess`
  ADD CONSTRAINT `fk_conid` FOREIGN KEY (`contentId`) REFERENCES `coursecontent` (`contentId`),
  ADD CONSTRAINT `fk_course_id` FOREIGN KEY (`courseId`) REFERENCES `csslcourse` (`courseId`),
  ADD CONSTRAINT `fk_mid_con_acc` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `councilmember`
--
ALTER TABLE `councilmember`
  ADD CONSTRAINT `fk_cocm` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `coursecomment`
--
ALTER TABLE `coursecomment`
  ADD CONSTRAINT `fk_cid_com` FOREIGN KEY (`contentId`) REFERENCES `coursecontent` (`contentId`),
  ADD CONSTRAINT `fk_mid_com` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `fk_reply_comm` FOREIGN KEY (`replyFor`) REFERENCES `coursecomment` (`commentId`);

--
-- Constraints for table `creditinfo`
--
ALTER TABLE `creditinfo`
  ADD CONSTRAINT `fk_creditinfo` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `csslcourse`
--
ALTER TABLE `csslcourse`
  ADD CONSTRAINT `fk_approved_cc` FOREIGN KEY (`approvedBy`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `fk_conduct_cc` FOREIGN KEY (`conductedBy`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `forum`
--
ALTER TABLE `forum`
  ADD CONSTRAINT `fk_mid_forum` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `forumanswer`
--
ALTER TABLE `forumanswer`
  ADD CONSTRAINT `fk_fid_fans` FOREIGN KEY (`forumId`) REFERENCES `forum` (`forumId`),
  ADD CONSTRAINT `fk_mid_fans` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `glapplicant`
--
ALTER TABLE `glapplicant`
  ADD CONSTRAINT `fk_gid_gapp` FOREIGN KEY (`gId`) REFERENCES `guestlecture` (`gId`),
  ADD CONSTRAINT `fk_mid_gapp` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `glselect`
--
ALTER TABLE `glselect`
  ADD CONSTRAINT `fk_gid_gselect` FOREIGN KEY (`gId`) REFERENCES `guestlecture` (`gId`),
  ADD CONSTRAINT `fk_mid_gselect` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `fk_seby_gselect` FOREIGN KEY (`selectedBy`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `guestlecture`
--
ALTER TABLE `guestlecture`
  ADD CONSTRAINT `fk_add_gl` FOREIGN KEY (`addBy`) REFERENCES `officer` (`id`),
  ADD CONSTRAINT `fk_verify_gl` FOREIGN KEY (`verifiedBy`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `memberjob`
--
ALTER TABLE `memberjob`
  ADD CONSTRAINT `fk_member_job` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `memberlogin`
--
ALTER TABLE `memberlogin`
  ADD CONSTRAINT `fk_mid_login` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `officer`
--
ALTER TABLE `officer`
  ADD CONSTRAINT `fk_admin_officer` FOREIGN KEY (`addBy`) REFERENCES `officer` (`id`);

--
-- Constraints for table `officerlogin`
--
ALTER TABLE `officerlogin`
  ADD CONSTRAINT `fk_officer_login` FOREIGN KEY (`officerId`) REFERENCES `officer` (`id`);

--
-- Constraints for table `othercourse`
--
ALTER TABLE `othercourse`
  ADD CONSTRAINT `fk_approve_oc` FOREIGN KEY (`approvedBy`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `professionalmember`
--
ALTER TABLE `professionalmember`
  ADD CONSTRAINT `fk_pro_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `studentmember`
--
ALTER TABLE `studentmember`
  ADD CONSTRAINT `fk_st_member` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `testinfo`
--
ALTER TABLE `testinfo`
  ADD CONSTRAINT `fk_cid_test` FOREIGN KEY (`contentId`) REFERENCES `coursecontent` (`contentId`),
  ADD CONSTRAINT `fk_mid_test` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`);

--
-- Constraints for table `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `workshopparticipate`
--
ALTER TABLE `workshopparticipate`
  ADD CONSTRAINT `fk_mid_wpartici` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `fk_wid_wpartici` FOREIGN KEY (`wId`) REFERENCES `csslworkshop` (`wId`);

--
-- Constraints for table `workshopreg`
--
ALTER TABLE `workshopreg`
  ADD CONSTRAINT `fk_mid_wreg` FOREIGN KEY (`memberId`) REFERENCES `member` (`memberId`),
  ADD CONSTRAINT `fk_wid_wreg` FOREIGN KEY (`wId`) REFERENCES `csslworkshop` (`wId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
