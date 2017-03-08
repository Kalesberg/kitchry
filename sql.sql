# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.34)
# Database: kitchry
# Generation Time: 2017-01-30 18:05:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table clients
# ------------------------------------------------------------

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique Identifier',
  `name` varchar(50) NOT NULL COMMENT 'Client Name',
  `slug` varchar(50) NOT NULL COMMENT 'Client Page URI',
  `email` varchar(50) NOT NULL COMMENT 'Email Address',
  `profile` varchar(100) DEFAULT NULL COMMENT 'Profile Image Path',
  `age` int(2) DEFAULT NULL COMMENT 'Age',
  `height` float DEFAULT NULL COMMENT 'Height',
  `height_unit` varchar(5) DEFAULT NULL COMMENT 'Height Unit',
  `weight` float DEFAULT NULL COMMENT 'Weight',
  `weight_unit` varchar(5) DEFAULT NULL COMMENT 'Weight Unit',
  `bmi` float DEFAULT NULL COMMENT 'BMI',
  `bodyfat` float DEFAULT NULL COMMENT 'Body Fat%',
  `bodyfat_unit` varchar(5) DEFAULT NULL COMMENT 'Body Fat Unit',
  `goal` varchar(100) DEFAULT NULL COMMENT 'Goal Title',
  `goal_unit` varchar(5) DEFAULT NULL COMMENT 'Goal Unit',
  `startdate` varchar(15) DEFAULT NULL COMMENT 'Goal Start Date',
  `enddate` varchar(15) DEFAULT NULL COMMENT 'Goal End Date',
  `outcome` varchar(20) DEFAULT NULL COMMENT 'Expected Goal Outcome',
  `outcome_unit` varchar(5) DEFAULT NULL COMMENT 'Outcome Unit',
  `restrict` varchar(100) DEFAULT NULL COMMENT 'Food Restrictions',
  `diet` int(11) unsigned DEFAULT NULL COMMENT 'Diet ID',
  `score` int(11) DEFAULT NULL COMMENT 'Score ID(Insights)',
  `lastlogin` datetime DEFAULT NULL COMMENT 'Last Login',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `email` (`email`),
  KEY `diet` (`diet`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;

INSERT INTO `clients` (`id`, `name`, `slug`, `email`, `profile`, `age`, `height`, `height_unit`, `weight`, `weight_unit`, `bmi`, `bodyfat`, `bodyfat_unit`, `goal`, `goal_unit`, `startdate`, `enddate`, `outcome`, `outcome_unit`, `restrict`, `diet`, `score`, `lastlogin`)
VALUES
	(1,'Scarlet Johansson','scarlet-johansson','scarlet.johansson@kitchry.com','/upload/profiles/scarlet-johansson.png',30,160,'',55.8,'',20,10,'','Body Slimming','','','','3kg','','',0,0,NULL),
	(5,'James Rodriguez','james-rodriguez','james.ro@mail.com','/upload/profiles/james.jpg',50,177,'',55,'',33,0,'','','','','','','','',0,0,NULL),
	(7,'Eddie Jasmine','eddie-jasmine','eddie.jasmine@site.com','/upload/profiles/eddie-jasmine.jpg',23,177,'',66,'',22,34,'','Trim','','','','','','',0,0,NULL),
	(8,'Gary Peter','gary-peter','peter@mail.com','',22,444,'',442,'',333,2,'','adsfasdfasdfasdfadsf','','','','','','',0,0,NULL),
	(9,'dfadsfasdf','dfadsfasdf','wefwefrwer','/upload/profiles/dfadsfasdf.jpg',0,0,'',0,'',0,0,'','','','','','','','',0,0,NULL);

/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table diets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `diets`;

CREATE TABLE `diets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Unique Identifier',
  `name` varchar(50) DEFAULT '' COMMENT 'Diet Name',
  `slug` varchar(50) DEFAULT '' COMMENT 'Diet Slug',
  `photo` varchar(100) DEFAULT '' COMMENT 'Diet Image',
  `dietician` varchar(50) DEFAULT '' COMMENT 'Dietician Name',
  `restrict` varchar(200) DEFAULT '' COMMENT 'Food Restrict',
  `intake` varchar(50) DEFAULT '' COMMENT 'Daily Colorie Intake',
  `carbohydrates` tinytext COMMENT 'Carbohydrates Group',
  `protein` tinytext COMMENT 'Protein Group',
  `fats` tinytext COMMENT 'Fats Group',
  `breakfast` varchar(10) DEFAULT NULL COMMENT 'Breakfast %',
  `morningsnack` varchar(10) DEFAULT NULL COMMENT 'Morning Snack %',
  `lunch` varchar(10) DEFAULT NULL COMMENT 'Lunch %',
  `eveningsnack` varchar(10) DEFAULT NULL COMMENT 'Evening Snack %',
  `dinner` varchar(10) DEFAULT NULL COMMENT 'Dinner %',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `diets` WRITE;
/*!40000 ALTER TABLE `diets` DISABLE KEYS */;

INSERT INTO `diets` (`id`, `name`, `slug`, `photo`, `dietician`, `restrict`, `intake`, `carbohydrates`, `protein`, `fats`, `breakfast`, `morningsnack`, `lunch`, `eveningsnack`, `dinner`)
VALUES
	(3,'Spagetti','spagetti','/upload/diets/spagetti.jpg','Anoop','[\"french_fries\"]','78','[\"11%\", \"22\", \"44\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]','[\"22%\", \"33\", \"100\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]','[\"66%\", \"77\", \"99\", \"\", \"\", \"\"]','1','2','3','4','5'),
	(4,'Kimchi','kimchi','/upload/diets/kimchi.jpg','DonnieKim','[\"radish\",\"cabbage\",\"pepper\"]','234','[\"100\", \"100\", \"100\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]','[\"100\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]','[\"100\", \"\", \"\", \"\", \"\", \"\"]','10','20','30','30','10'),
	(5,'Salad','salad',NULL,'Marko','[\"carrot\", \"potato\", \"egg\"]','23','[\"12\", \"34\", \"5\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]','[\"10\", \"20\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"]','[\"30\", \"20\", \"\", \"\", \"\", \"\"]','12','23','56','0','0');

/*!40000 ALTER TABLE `diets` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
