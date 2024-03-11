CREATE TABLE `offers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL,
  `validity_duration` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `expires_at` datetime DEFAULT NULL,
  `listing_id` int DEFAULT NULL,
  `bidder_id` int DEFAULT NULL,
  `accepted` tinyint(1) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  `owner_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`),
  FOREIGN KEY (`bidder_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
