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

/*Data for the table `borrow` */

insert  into `borrow`(`username`,`sdate`,`edate`,`FacNo`,`uselong`,`state`,`renew`,`aim`) values ('1237897','2017-04-23','2017-04-28','dny001',5,100,0,''),('20141169','2017-04-23','2017-05-23','dny001',30,101,1,'gfdgfh'),('20141169','2017-04-23','2017-05-22','tyy001',29,100,1,'教课');

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

/*Data for the table `facinfo` */

insert  into `facinfo`(`LabNo`,`FacNo`,`FacName`,`FacModel`,`Stock`,`Used`,`Information`) values ('2652','dny001','电脑椅','qdqakdjk',100,2,'和电脑桌配套使用'),('2652','dnz001','电脑桌','abkqazwsx2s',100,0,'放电脑，主机，鼠标，键盘'),('2652','fwq001','服务器','ahdjahcba',2,0,'2'),('2652','hb001','黑板','adkhakd',1,0,'配合教师讲课使用'),('3106','kyq254','扩音器','fa855654',40,0,'无'),('2103','mkf002','麦克风','UT112456',23,0,'略\r\n'),('1605','sb520','鼠标','SB789654',40,0,'无'),('2306','tyy001','投影仪','zx123456',40,1,'空'),('1605','xsq001','显示器','WZ145623',40,0,'无'),('1653','zjx856','主机箱','ui135155',8,0,'无');

/*Table structure for table `keynumber` */

DROP TABLE IF EXISTS `keynumber`;

CREATE TABLE `keynumber` (
  `keyvalue` varchar(17) NOT NULL COMMENT '邀请码',
  `used` tinyint(1) NOT NULL COMMENT '是否使用',
  PRIMARY KEY (`keyvalue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `keynumber` */

insert  into `keynumber`(`keyvalue`,`used`) values ('0F9A7FE62D477FF1',1),('276C52DFE5048CD1',0),('2C98952486C43D01',0),('2F0FDF674490474A',1),('58AE8A918F16D364',0),('661910D0C4DED7F9',0),('AE0823A86F1F9F18',0),('B6A8F5A3D854A716',0),('C8CD0975F89DDB54',0),('DBBAD0A78617DA29',0);

/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `username` varchar(9) NOT NULL,
  `password` varchar(33) NOT NULL COMMENT 'MD5加密密码',
  `complete` tinyint(1) NOT NULL,
  `usertype` tinyint(1) NOT NULL COMMENT '用户类型',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `login` */

insert  into `login`(`username`,`password`,`complete`,`usertype`) values ('123123','4297f44b13955235245b2497399d7a93',1,1),('123456','e10adc3949ba59abbe56e057f20f883e',0,0),('1237897','0344c76928d4707f37590041cced37da',1,0),('20141169','0c5a08355406c6db4f55c16876bff89a',1,0),('20141173','e10adc3949ba59abbe56e057f20f883e',1,1),('admins','69ed688613f4a636545c424e2fca02fc',1,1);

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

/*Data for the table `personal` */

insert  into `personal`(`username`,`college`,`name`,`telephone`) values ('123123','计算机','徐健平','15645645644'),('123456',NULL,NULL,NULL),('1237897','计算机','刘伟东','18443101163'),('20141169','计算机科学与工程学院','徐健平','17643173220'),('20141173','计算机','于得海','18743702668'),('admins','计算机科学与工程学院','刘伟东','18443101163');

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
