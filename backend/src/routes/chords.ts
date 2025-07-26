import { Router } from 'express';
import { db } from '../db/index.js';
import { chords } from '../db/schema.js';
import { ChordSchema } from '../schemas/index.js';
import { eq } from 'drizzle-orm';

export const chordRouter = Router();

chordRouter.post('/', async (req, res) => {
  try {
    const chord = ChordSchema.parse(req.body);
    const result = await db.insert(chords).values({
      name: chord.name,
      fingering: JSON.stringify(chord.fingering),
      frets: chord.frets,
      notes: JSON.stringify(chord.notes)
    }).returning();
    
    res.json({
      ...result[0],
      fingering: JSON.parse(result[0].fingering),
      notes: JSON.parse(result[0].notes)
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
});

chordRouter.get('/', async (req, res) => {
  try {
    const allChords = await db.select().from(chords);
    const parsed = allChords.map(chord => ({
      ...chord,
      fingering: JSON.parse(chord.fingering),
      notes: JSON.parse(chord.notes)
    }));
    res.json(parsed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chords' });
  }
});

chordRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const chord = await db.select().from(chords).where(eq(chords.id, id)).limit(1);
    
    if (chord.length === 0) {
      return res.status(404).json({ error: 'Chord not found' });
    }
    
    res.json({
      ...chord[0],
      fingering: JSON.parse(chord[0].fingering),
      notes: JSON.parse(chord[0].notes)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chord' });
  }
});