-- CreateTable
CREATE TABLE `users` (
    `user_id` VARCHAR(36) NOT NULL,
    `user_email` VARCHAR(255) NOT NULL,
    `user_phone` VARCHAR(255) NOT NULL,
    `user_username` VARCHAR(255) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `users_user_email_key`(`user_email`),
    UNIQUE INDEX `users_user_phone_key`(`user_phone`),
    UNIQUE INDEX `users_user_username_key`(`user_username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
