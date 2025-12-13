import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import livereload from 'livereload';
import connectLiveReload from 'connect-livereload';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Supabase Client Initialization ---
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
// ------------------------------------

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'src'));
liveReloadServer.watch(path.join(__dirname, 'index.html'));

const app = express();

// --- EJS Configuration ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'webpages'));
// -------------------------

app.use(connectLiveReload());

app.use('/src', express.static(path.join(__dirname, 'src')));

// --- API Route to Test Supabase Connection ---
app.get('/api/test-db', async (req, res) => {
  const { data, error } = await supabase.from('user').select('*').limit(1);

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: 'Failed to connect to database', details: error.message });
  }

  res.json({ message: 'Successfully connected to Supabase!', data });
});
// -----------------------------------------

// --- Update Routes to use res.render ---
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/log-in', (req, res) => {
  res.render('log-in', { title: 'Log In' });
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up', { title: 'Sign Up' });
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
