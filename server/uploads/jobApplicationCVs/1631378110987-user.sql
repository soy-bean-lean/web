-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2021 at 09:19 AM
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
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(6) NOT NULL,
  `title` varchar(10) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `nic` varchar(12) DEFAULT NULL,
  `residentialAddress` varchar(100) NOT NULL,
  `contactNumber` varchar(12) NOT NULL,
  `birthDate` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `userType` varchar(40) NOT NULL,
  `registeredDate` date NOT NULL DEFAULT current_timestamp(),
  `status` int(2) NOT NULL,
  `approvedBy` varchar(10) DEFAULT NULL,
  `profileImage` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `title`, `firstName`, `lastName`, `nic`, `residentialAddress`, `contactNumber`, `birthDate`, `email`, `password`, `userType`, `registeredDate`, `status`, `approvedBy`, `profileImage`) VALUES
(1, 'Prof (Mrs)', 'D.A.D Anushka', 'Vithanage', NULL, 'Bandarawella road', '+10715279016', '2021-08-18', 'pro', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve', 'professional', '2021-09-06', 0, NULL, ''),
(2, 'Prof (Mrs)', 'Anushka ', 'Darshan     ', '978787  ', 'Badulla     ', '0718553224  ', '2021-02-09', 'anushka@gmail.com', '$2b$10$LTlsMkolrCRylnAeeLvZseY5LqAFldUqJDCus5WY119DLS/BkI7Ve', 'professional', '2021-09-06', 0, NULL, ' 1631215495439-graduate.png '),
(3, '', '', '', NULL, '', '', '', '', '$2b$10$4hx.gHPlPFB9sLiHdUjyxuLfESyNluqqAoSAm1ku.sXsW/c0ZIIrm', 'secretariat', '2021-09-09', 0, NULL, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nic` (`nic`),
  ADD KEY `fk_cm1` (`approvedBy`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_cm1` FOREIGN KEY (`approvedBy`) REFERENCES `member` (`memberId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
