--
-- Database: `multiclothes`
--
DROP DATABASE IF EXISTS multiclothes;
CREATE DATABASE IF NOT EXISTS `multiclothes`;
USE `multiclothes`;

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

CREATE TABLE IF NOT EXISTS `admin_info` (
	`AD_NUM` CHAR(9) PRIMARY KEY,
    `AD_FNAME` VARCHAR(50) NOT NULL,
    `AD_LNAME` VARCHAR(50) NOT NULL,
    `AD_ADDRESS` VARCHAR(500) NOT NULL,
    `AD_BD` DATE NOT NULL,
    `AD_EMAIL` VARCHAR(50) NOT NULL,
    `AD_PHONE` CHAR(10)
);

INSERT INTO `admin_info`VALUES
	('000000001','Somsri','Mayang','999 Phuttamonthon 4 Road, Salaya, Nakhon Pathom 73170 Thailand','1988-11-22','somsri.may@multiclothes.com','0869144407'),
    ('006000202','Yang','Nonyu','23, Trok Rongnamkeang, Yotha Rd., Bangkok, 10100 Thailand','1991-01-17','yang.non@multiclothes.com','0972187739'),
    ('000020031','Suaysood','Naisoy','Khlong Luang 25 KhlongNung KhlongLuang, Chang Wat Pathum Thani 12120','2001-05-03','Suaysood.nai@multiclothes.com','0978394783'),
    ('000885600','Waimaii','Yaknon','17 Henri Dunant Rd, Khwaeng Pathum Wan, Khet Pathum Wan, Krung Thep Maha Nakhon 10330','1970-07-29','Waimaii.yak@multiclothes.com','0622785590'),
    ('000032191','Chanom','Kaimook','62 Moo 1, Rangsit-Ongkharak Road (Km.7) Thanyaburi, Pathum Thani','1999-09-12','Chanom.kai@multiclothes.com','0974328801');
-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE IF NOT EXISTS `admin_login` (
    `AD_USERNAME` VARCHAR(50) NOT NULL,
    `AD_PASSWORD` VARCHAR(20) NOT NULL,
    `AD_LOGIN_TIMESTAMP` DATETIME NOT NULL,
    `AD_NUM` CHAR(9) NOT NULL,
    CONSTRAINT `FK_adminAD_NUM` FOREIGN KEY (`AD_NUM`)
	REFERENCES `admin_info` (`AD_NUM`)
);

INSERT INTO `admin_login` VALUES
	('somsri.may@multiclothes.com', 'Somchai555', '2022-11-08 22:02:22', '000000001'),
    ('yang.non@multiclothes.com', 'nyaungyooka', '2022-03-18 18:29:30', '006000202'),
    ('Waimaii.yak@multiclothes.com', 'Maiwai', '2022-01-04 10:20:35', '000885600'),
    ('Chanom.kai@multiclothes.com', 'Maiwann0', '2022-10-01 15:29:09', '000032191'),
    ('Suaysood.nai@multiclothes.com', 'blursabb', '2022-12-15 01:45:27', '000020031');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--


CREATE TABLE IF NOT EXISTS `product` (
	`PROD_ID` CHAR(12) PRIMARY KEY,
    `PROD_NAME` VARCHAR(50) NOT NULL,
    `PROD_BRAND` VARCHAR(50) NULL,
    `PROD_DES` VARCHAR(500) NOT NULL,
    `PROD_TYPE` VARCHAR(20) DEFAULT NULL,
    `PROD_COLOR` VARCHAR(100) DEFAULT NULL,
    `PROD_PRICE` DECIMAL(9,2) NOT NULL,
    `PROD_QUANTITY` INT NOT NULL,
    `PROD_SIZE` VARCHAR(10) DEFAULT NULL
);
INSERT INTO `product` VALUES
	('AB1234567890', 'Oversized V-neck Sweatshirt', 'H&M', 
    'CONSCIOUS CHOICE Oversized top in sweatshirt fabric made from a cotton blend with a soft brushed inside. V-neck, low dropped shoulders and long sleeves. Ribbing around the neckline and cuffs and a raw, roll-edge hem.
	Composition
	Rib Cotton 95%
	Elastane 5%
	Shell Cotton 62%
	Polyester 38%', 
    'Cloth', 'Black-White', '29.99', '100', 'S'),
    ('AB1134567890', 'Canvas Hi-top Trainers', 'H&M', 
    'CONSCIOUS CHOICE Hi-tops in sturdy cotton canvas with a tongue and lacing at the front, and metal eyelets in one side. Cotton canvas linings and insoles and rubber soles that are patterned underneath. Height of soles 3.1 cm.
	Composition
	Upper Cotton 100%
	Outersole Rubber 100%
	Liningsock Cotton 100%', 
    'Footwear', 'Black', '33.00', '50', '35'),
    ('AB1114567890', 'Fitted Double-Breasted Blazer', 'ZARA', 
    'Tailored blazer with a lapel collar and long sleeves. Front flap pockets and a welt chest pocket. Matching lining. Double-breasted button fastening at the front.
	Composition
	Polyester 68%
	Viscose 29%
	Elastane 3%', 
    'Cloth', 'White', '120.00', '20', 'XXS'),
    ('AB1111567890', 'Heart Print T-Shirt', 'ZARA', 
    'T-shirt with a round neckline and short sleeves. Contrast prints on the front and back.
	Composition
	Cotton 100%', 
    'Cloth', 'Crimson', '29.99', '150', 'XL'),
    ('AB1111167890', 'Mens MB', 'FILA', 
    'CIconic midsole design and printed graphic motif on quarter with embroidered FILA logos on quarter, tongue, toebox, and heel.
	Composition
	Leather
	Synthetic', 
    'Footwear', '107 EGRET-GRAY MIST', '95.00', '130', '40');

select *
from product;
select *
from admin_login;
select *
from admin_info;

