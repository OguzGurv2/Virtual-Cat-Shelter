import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import livereload from 'livereload';
import connectLiveReload from 'connect-livereload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Create a live reload server
// It will watch your public-facing files for changes.
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'src'));
liveReloadServer.watch(path.join(__dirname, 'index.html')); // Watch other files too

const app = express();

// 2. Use the middleware to inject the reload script
app.use(connectLiveReload());

app.use('/src', express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/webpages/index.html'));
});

app.get('/log-in', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/webpages/log-in.html'));
});

app.get('/sign-up', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/webpages/sign-up.html'));
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
