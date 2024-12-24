CREATE TABLE `request` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`actionId` integer NOT NULL,
	`headers` text NOT NULL,
	`body` text NOT NULL,
	`statusCode` integer NOT NULL,
	`roundTripTime` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `aciton` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`groupId` integer NOT NULL,
	`method` text NOT NULL,
	`headers` text NOT NULL,
	`url` text NOT NULL
);
