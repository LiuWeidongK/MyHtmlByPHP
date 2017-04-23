/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.7.14 : Database - manager
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`manager` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `manager`;

/*Table structure for table `borrow` */

DROP TABLE IF EXISTS `borrow`;

CREATE TABLE `borrow` (
  `username` varchar(9) NOT NULL,
  `sdate` date NOT NULL COMMENT '借用日期',
  `edate` date NOT NULL COMMENT '到期日期',
  `FacNo` varchar(8) NOT NULL COMMENT '借用器材编号',
  `uselong` int(11) NOT NULL COMMENT '借用时长',
  `state` int(11) NOT NULL COMMENT '状态码',
  `renew` tinyint(1) NOT NULL,
  `aim` text COMMENT '借用目的',
  PRIMARY KEY (`username`,`FacNo`),
  KEY `FacNo` (`FacNo`),
  CONSTRAINT `borrow_ibfk_1` FOREIGN KEY (`username`) REFERENCES `login` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `borrow_ibfk_2` FOREIGN KEY (`FacNo`) REFERENCES `facinfo` (`FacNo`) ON DELETE CASCADE ON UPDATE CASCADE
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
  PRIMARY KEY (`username`),
  CONSTRAINT `personal_ibfk_1` FOREIGN KEY (`username`) REFERENCES `login` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!50106 set global event_scheduler = 1*/;

/* Event structure for event `eDay` */

/*!50106 DROP EVENT IF EXISTS `eDay`*/;

DELIMITER $$

/*!50106 CREATE DEFINER=`root`@`localhost` EVENT `eDay` ON SCHEDULE EVERY 6 HOUR STARTS '2017-04-19 00:00:00' ENDS '2018-05-19 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO CALL uState() */$$
DELIMITER ;

/* Procedure structure for procedure `uState` */

/*!50003 DROP PROCEDURE IF EXISTS  `uState` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `uState`()
    NO SQL
BEGIN
UPDATE borrow SET state=101 WHERE DATEDIFF(edate,CURDATE())>0 AND DATEDIFF(edate,CURDATE())<=3 AND state!=103;
UPDATE borrow SET state=102 WHERE DATEDIFF(edate,CURDATE())<=0 AND state!=103;
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
