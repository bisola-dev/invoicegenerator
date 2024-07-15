/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306_1
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : invoicegenerator_db

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 15/07/2024 14:18:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for invoices
-- ----------------------------
DROP TABLE IF EXISTS `invoices`;
CREATE TABLE `invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `invoiceData` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of invoices
-- ----------------------------
BEGIN;
INSERT INTO `invoices` (`id`, `email`, `invoiceData`, `createdAt`, `updatedAt`) VALUES (1, 'john.doe@example.com', '{\"items\": [{\"name\": \"Item 1\", \"price\": 500, \"quantity\": 2}, {\"name\": \"Item 2\", \"price\": 500, \"quantity\": 1}], \"amount\": 1500, \"invoiceNumber\": \"INV-001\"}', '2024-07-05 15:54:45', '2024-07-05 15:54:45');
INSERT INTO `invoices` (`id`, `email`, `invoiceData`, `createdAt`, `updatedAt`) VALUES (2, 'alice@example.com', '{\"items\": [{\"name\": \" Item 1\", \"price\": 1000, \"quantity\": 2}, {\"name\": \" Item 2\", \"price\": 1500, \"quantity\": 1}], \"amount\": 2500, \"invoiceNumber\": \"INV-002\"}', '2024-07-05 15:55:57', '2024-07-08 11:50:23');
INSERT INTO `invoices` (`id`, `email`, `invoiceData`, `createdAt`, `updatedAt`) VALUES (3, 'charlie@example.com', '{\"items\": [{\"name\": \"Item 1\", \"price\": 7500, \"quantity\": 2}, {\"name\": \"Item 2\", \"price\": 500, \"quantity\": 1}], \"amount\": 8000, \"invoiceNumber\": \"INV-003\"}', '2024-07-05 15:56:19', '2024-07-07 12:27:14');
COMMIT;

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Users
-- ----------------------------
BEGIN;
INSERT INTO `Users` (`id`, `fullName`, `email`, `password`, `createdAt`, `updatedAt`) VALUES (1, 'John Doe', 'johndoe@example.com', '$2a$10$yyAK3PTVj/d6Ql/W3q2UWOmRnS/8O8LAjuXnSF5XgZmu2g56A00ne', '2024-07-05 10:22:14', '2024-07-05 10:22:14');
INSERT INTO `Users` (`id`, `fullName`, `email`, `password`, `createdAt`, `updatedAt`) VALUES (2, 'Dorisa hepburn', 'dorissa@yahoo.com', '$2a$10$h./M5yWUNdQG6QAWnIaj.u2Yt60/tXDofzVYDBOLtSO.syvgEz30O', '2024-07-05 10:40:01', '2024-07-05 10:40:01');
INSERT INTO `Users` (`id`, `fullName`, `email`, `password`, `createdAt`, `updatedAt`) VALUES (3, 'Helen craig', 'helen@yahoo.com', '$2a$10$1tTEH92W9WToOhprO.l0rOLepcJ2IDw5z0lHemP3sUfcsuMRAu9jS', '2024-07-05 10:40:56', '2024-07-05 10:40:56');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
