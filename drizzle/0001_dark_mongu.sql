CREATE TABLE `advertisements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('top_slot','bottom_box','in_content') NOT NULL,
	`position` int NOT NULL,
	`imageUrl` text NOT NULL,
	`linkUrl` text NOT NULL,
	`language` enum('en','ko','zh','ja') NOT NULL,
	`text` text NOT NULL,
	`categoryId` varchar(50),
	`active` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `advertisements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` varchar(50) NOT NULL,
	`icon` varchar(10) NOT NULL,
	`order` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `translations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` varchar(50) NOT NULL,
	`language` enum('en','ko','zh','ja') NOT NULL,
	`title` varchar(200) NOT NULL,
	`subtitle` text NOT NULL,
	`overview` text NOT NULL,
	`sections` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `translations_id` PRIMARY KEY(`id`)
);
