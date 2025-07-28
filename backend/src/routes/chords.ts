import { Elysia, t } from 'elysia';
import { db } from '../db/index.js';
import { chords } from '../db/schema.js';
import { ChordSchema } from '../schemas/index.js';
import { eq } from 'drizzle-orm';

export const chordRoutes = new Elysia({ prefix: '/api/chords' })
  .post('/', async ({ body, set }) => {
    try {
      const result = await db.insert(chords).values({
        name: body.name,
        fingering: JSON.stringify(body.fingering),
        frets: body.frets,
        notes: JSON.stringify(body.notes)
      }).returning();
      
      return {
        ...result[0],
        fingering: JSON.parse(result[0].fingering),
        notes: JSON.parse(result[0].notes)
      };
    } catch (error) {
      set.status = 400;
      return { error: error instanceof Error ? error.message : 'Failed to create chord' };
    }
  }, {
    body: ChordSchema,
    detail: {
      summary: 'Create a new chord',
      tags: ['Chords']
    }
  })
  .get('/', async () => {
    try {
      const allChords = await db.select().from(chords);
      return allChords.map(chord => ({
        ...chord,
        fingering: JSON.parse(chord.fingering),
        notes: JSON.parse(chord.notes)
      }));
    } catch (error) {
      return { error: 'Failed to fetch chords' };
    }
  }, {
    detail: {
      summary: 'Get all chords',
      tags: ['Chords']
    }
  })
  .get('/:id', async ({ params, set }) => {
    try {
      const id = parseInt(params.id);
      const chord = await db.select().from(chords).where(eq(chords.id, id)).limit(1);
      
      if (chord.length === 0) {
        set.status = 404;
        return { error: 'Chord not found' };
      }
      
      return {
        ...chord[0],
        fingering: JSON.parse(chord[0].fingering),
        notes: JSON.parse(chord[0].notes)
      };
    } catch (error) {
      set.status = 500;
      return { error: 'Failed to fetch chord' };
    }
  }, {
    params: t.Object({
      id: t.String()
    }),
    detail: {
      summary: 'Get chord by ID',
      tags: ['Chords']
    }
  })
  .put('/:id', async ({ params, body, set }) => {
    try {
      const id = parseInt(params.id);
      const result = await db.update(chords)
        .set({
          name: body.name,
          fingering: JSON.stringify(body.fingering),
          frets: body.frets,
          notes: JSON.stringify(body.notes)
        })
        .where(eq(chords.id, id))
        .returning();
      
      if (result.length === 0) {
        set.status = 404;
        return { error: 'Chord not found' };
      }
      
      return {
        ...result[0],
        fingering: JSON.parse(result[0].fingering),
        notes: JSON.parse(result[0].notes)
      };
    } catch (error) {
      set.status = 400;
      return { error: error instanceof Error ? error.message : 'Failed to update chord' };
    }
  }, {
    params: t.Object({
      id: t.String()
    }),
    body: ChordSchema,
    detail: {
      summary: 'Update chord by ID',
      tags: ['Chords']
    }
  })
  .delete('/:id', async ({ params, set }) => {
    try {
      const id = parseInt(params.id);
      const result = await db.delete(chords).where(eq(chords.id, id)).returning();
      
      if (result.length === 0) {
        set.status = 404;
        return { error: 'Chord not found' };
      }
      
      return { message: 'Chord deleted successfully' };
    } catch (error) {
      set.status = 500;
      return { error: 'Failed to delete chord' };
    }
  }, {
    params: t.Object({
      id: t.String()
    }),
    detail: {
      summary: 'Delete chord by ID',
      tags: ['Chords']
    }
  });