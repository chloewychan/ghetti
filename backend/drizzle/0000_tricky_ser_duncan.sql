CREATE TABLE `chords` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`fingering` text NOT NULL,
	`frets` integer NOT NULL,
	`notes` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `songs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`chord_ids` text NOT NULL,
	`structure` text NOT NULL,
	`lyrics` text
);
