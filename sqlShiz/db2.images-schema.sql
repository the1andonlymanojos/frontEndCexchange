CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uploader_id` int DEFAULT NULL,
  `pathOriginal` varchar(255) DEFAULT NULL,
  `pathThumbnail` varchar(255) DEFAULT NULL,
  `pathMedium` varchar(255) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`uploader_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
