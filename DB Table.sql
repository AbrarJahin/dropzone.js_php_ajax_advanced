CREATE TABLE IF NOT EXISTS `file_upload`
(
	`fid` int(11) NOT NULL AUTO_INCREMENT,
	`f_name` varchar(255) NOT NULL,
	`f_size` bigint(22) NOT NULL,
	`f_link` varchar(255) NOT NULL,
	`f_type` varchar(255) NOT NULL,
	`d_date` date NOT NULL,
	PRIMARY KEY (`fid`)
);
