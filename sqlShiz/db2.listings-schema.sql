CREATE TABLE `listings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `images` json DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `suggested_minimum_bid` float NOT NULL,
  `description` text NOT NULL,
  `ext_link` varchar(255) DEFAULT NULL,
  `creator_id` int NOT NULL,
  `availability` varchar(50) DEFAULT 'available',
  `highest_bid` float DEFAULT NULL,
  PRIMARY KEY (`id`)
  FOREIGN KEY (creator_id) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
