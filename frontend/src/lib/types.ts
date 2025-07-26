export interface Chord {
  id?: number;
  name: string;
  fingering: number[];
  frets: number;
  notes: string[];
}

export interface Song {
  id?: number;
  title: string;
  chordIds: number[];
  structure: string;
  lyrics?: string;
}