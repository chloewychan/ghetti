import { t, Static } from 'elysia';

export const ChordSchema = t.Object({
  id: t.Optional(t.Number()),
  name: t.String({ minLength: 1 }),
  fingering: t.Array(t.Number()),
  frets: t.Number({ minimum: 1 }),
  notes: t.Array(t.String())
});

export const SongSchema = t.Object({
  id: t.Optional(t.Number()),
  title: t.String({ minLength: 1 }),
  chordIds: t.Array(t.Number()),
  structure: t.String(),
  lyrics: t.Optional(t.String())
});

export type Chord = Static<typeof ChordSchema>;
export type Song = Static<typeof SongSchema>;