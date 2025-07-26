import { z } from 'zod';

export const ChordSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  fingering: z.array(z.number()),
  frets: z.number().min(1),
  notes: z.array(z.string())
});

export const SongSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  chordIds: z.array(z.number()),
  structure: z.string(),
  lyrics: z.string().optional()
});

export type Chord = z.infer<typeof ChordSchema>;
export type Song = z.infer<typeof SongSchema>;