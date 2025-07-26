import type { Chord } from '../types.js';

const API_BASE = 'http://localhost:3000/api';

export async function fetchChords(): Promise<Chord[]> {
  const response = await fetch(`${API_BASE}/chords`);
  if (!response.ok) throw new Error('Failed to fetch chords');
  return response.json();
}

export async function fetchChord(id: number): Promise<Chord> {
  const response = await fetch(`${API_BASE}/chords/${id}`);
  if (!response.ok) throw new Error('Failed to fetch chord');
  return response.json();
}

export async function createChord(chord: Omit<Chord, 'id'>): Promise<Chord> {
  const response = await fetch(`${API_BASE}/chords`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chord)
  });
  if (!response.ok) throw new Error('Failed to create chord');
  return response.json();
}