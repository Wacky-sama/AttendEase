-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 06, 2025 at 11:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attendance_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `student_id` varchar(8) NOT NULL,
  `date` date NOT NULL,
  `status` enum('Present','Absent','Late') NOT NULL DEFAULT 'Present',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `student_id`, `date`, `status`, `timestamp`) VALUES
(6, '12-20341', '2025-10-21', 'Absent', '2025-10-21 18:21:30'),
(7, '12-20341', '2025-11-05', 'Present', '2025-11-05 10:30:24'),
(8, '22-30463', '2025-11-05', 'Present', '2025-11-05 15:22:52'),
(9, '12-34567', '2025-11-05', 'Late', '2025-11-05 16:44:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role` enum('admin','student') DEFAULT 'student',
  `student_id` varchar(8) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_initial` char(1) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `course` varchar(100) DEFAULT NULL,
  `year_level` int(11) DEFAULT NULL,
  `section` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `student_id`, `last_name`, `first_name`, `middle_initial`, `username`, `password`, `course`, `year_level`, `section`, `created_at`) VALUES
(1, 'student', '12-20341', 'Han', 'Sooyoung', '', 'hansooyoung', '$2y$10$NQNm2COtTnyP6oW5ZoEc3.6gjkyyawm3XNy6PrCOGAZRtjERROhAq', 'BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY', 4, 'A', '2025-10-21 16:47:30'),
(2, 'admin', NULL, 'Administrator', 'System', NULL, 'admin', '$2y$10$VAcI63/Ff2tSug6rF4lXFOjGMkk2ice2tXGwpRHzJ0Fb2FKKyfGS2', NULL, NULL, NULL, '2025-10-21 16:58:01'),
(5, 'student', '22-30463', 'Tabugadir', 'Kenji \"Brocks\"', 'I', 'wacky', '$2y$10$ZW2bG/yOYFrMd7jG7Xs/nu1cQLNWcxYRz1EM5BVEu2fCWuVu1epP2', 'BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY', 4, 'A', '2025-11-05 12:49:04'),
(6, 'student', '12-34567', 'Kim', 'Dokla', '', 'kimdokja', '$2y$10$dIcIYgHlLiXgQ1qxouyQOe3qs5WRYSyRKihseTONW6/zVAKmYtSe2', 'BACHELOR OF SCIENCE IN ACCOUNTING INFORMATION SYSTEM', 4, 'A', '2025-11-05 16:44:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_attendance_date` (`date`),
  ADD KEY `idx_attendance_student_date` (`student_id`,`date`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `fk_attendance_user` FOREIGN KEY (`student_id`) REFERENCES `users` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
