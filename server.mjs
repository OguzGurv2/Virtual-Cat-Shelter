import express from 'express';

const app = express();

app.use(express.static('index.html'));

app.listen(8080);
