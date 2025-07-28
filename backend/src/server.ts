import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { node } from '@elysiajs/node';
import { chordRoutes } from './routes/chords.js';

const PORT = process.env.PORT || 3001;

const app = new Elysia({ 
  adapter: node() 
})
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: 'Ghetti API',
        version: '1.0.0',
        description: 'API for chord and song management'
      }
    }
  }))
  .get('/health', () => ({ status: 'ok' }))
  .use(chordRoutes)
  .listen(PORT);

console.log(`🦊 Elysia is running at http://localhost:${PORT}`);