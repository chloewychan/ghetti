import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const chords = sqliteTable('chords', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  fingering: text('fingering').notNull(), // JSON string
  frets: integer('frets').notNull(),
  notes: text('notes').notNull() // JSON string
});

export const songs = sqliteTable('songs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  chordIds: text('chord_ids').notNull(), // JSON string
  structure: text('structure').notNull(),
  lyrics: text('lyrics')
});