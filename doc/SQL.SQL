CREATE TABLE
    `log` (
        `action_id` varchar(128) NOT NULL,
        `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
        `user_id` int (11) NOT NULL,
        `action` varchar(100) NOT NULL,
        `other_data` text DEFAULT NULL,
        `ip` varchar(16) NOT NULL,
        PRIMARY KEY (`action_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci
CREATE TABLE
    `user` (
        `id` int (11) NOT NULL AUTO_INCREMENT,
        `name` varchar(75) NOT NULL,
        `surname` varchar(75) NOT NULL,
        `email` varchar(75) NOT NULL,
        `password` varchar(114) NOT NULL,
        `status` tinyint (4) NOT NULL DEFAULT 1,
        `role` longtext CHARACTER
        SET
            utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '["user"]',
            `discord_id` varchar(50) DEFAULT NULL,
            `profile_picture` text NOT NULL DEFAULT 'https://assets.sportifyapp.co/profile_picture/default.png',
            `creation_date` timestamp NOT NULL DEFAULT current_timestamp(),
            `last_login` timestamp NOT NULL DEFAULT current_timestamp(),
            PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 301 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci   