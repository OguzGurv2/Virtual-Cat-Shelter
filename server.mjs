import express from 'express';

const app = express();

app.use(express.static('webpages'));

app.listen(8080);
