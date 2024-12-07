-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Party` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text(200),
	`photo` text(1000),
	`date` numeric
);
--> statement-breakpoint
CREATE TABLE `Candidate` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text(200),
	`party_id` integer,
	`photo` text(1000),
	`date` numeric,
	FOREIGN KEY (`party_id`) REFERENCES `Party`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Medium` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text(200),
	`photo` text(1000),
	`date` numeric
);
--> statement-breakpoint
CREATE TABLE `Vote` (
	`id` integer PRIMARY KEY NOT NULL,
	`number` integer,
	`candidate_id` integer,
	`race_id` integer,
	`medium_id` integer,
	`date` numeric,
	FOREIGN KEY (`medium_id`) REFERENCES `Medium`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`race_id`) REFERENCES `Race`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `Candidate`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Race` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text(1000) NOT NULL,
	`type` integer,
	`date` numeric,
	`region_id` integer
);
--> statement-breakpoint
CREATE TABLE `Region` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text(50) NOT NULL,
	`date` numeric
);

*/