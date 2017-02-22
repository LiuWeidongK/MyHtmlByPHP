/*
SQLyog Ultimate v10.42 
MySQL - 5.5.28 : Database - myhtmldb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`myhtmldb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `myhtmldb`;

/*Table structure for table `borrow` */

DROP TABLE IF EXISTS `borrow`;

CREATE TABLE `borrow` (
  `username` varchar(9) NOT NULL,
  `sdate` date NOT NULL COMMENT '借用日期',
  `FacNo` varchar(8) NOT NULL COMMENT '借用器材编号',
  `uselong` int(11) NOT NULL COMMENT '借用时长',
  `aim` text COMMENT '借用目的'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `facinfo` */

DROP TABLE IF EXISTS `facinfo`;

CREATE TABLE `facinfo` (
  `LabNo` varchar(8) NOT NULL COMMENT '实验室编号',
  `FacNo` varchar(8) NOT NULL COMMENT '设备编号',
  `FacName` varchar(17) NOT NULL COMMENT '设备名称',
  `FacModel` varchar(21) NOT NULL COMMENT '设备型号',
  `Stock` int(11) NOT NULL COMMENT '库存数量',
  `Used` int(11) NOT NULL COMMENT '已使用数量',
  `Information` text NOT NULL COMMENT '详细信息',
  PRIMARY KEY (`FacNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `keynumber` */

DROP TABLE IF EXISTS `keynumber`;

CREATE TABLE `keynumber` (
  `keyvalue` varchar(17) NOT NULL COMMENT '邀请码',
  `used` tinyint(1) NOT NULL COMMENT '是否使用',
  PRIMARY KEY (`keyvalue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `username` varchar(9) NOT NULL,
  `password` varchar(33) NOT NULL COMMENT 'MD5加密密码',
  `complete` tinyint(1) NOT NULL,
  `usertype` tinyint(1) NOT NULL COMMENT '用户类型',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `personal` */

DROP TABLE IF EXISTS `personal`;

CREATE TABLE `personal` (
  `username` varchar(9) NOT NULL,
  `college` varchar(16) DEFAULT NULL COMMENT '学院',
  `name` varchar(11) DEFAULT NULL COMMENT '姓名',
  `telephone` varchar(12) DEFAULT NULL COMMENT '电话',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
