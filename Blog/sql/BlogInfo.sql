CREATE TABLE `BlogInfo` (
`id` varchar(50) not null,
`title` varchar(150) ,
`content` MEDIUMTEXT NOT NULL,
`createTime` datetime ,
`type` int ,
`state` int ,
INDEX `IX_BlogInfo_id` (`id`),
INDEX `IX_BlogInfo_createTime` (`createTime`),
PRIMARY KEY (`id`)
);
