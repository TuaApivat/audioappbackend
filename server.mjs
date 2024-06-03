import express from "express";
import pg from 'pg';

const app = express();
const port = 3000;

const client = new pg.Client({ user: 'postgres', host: 'localhost', database: 'AudioPlayerApp', password: 'master151', port: 5432,});
client.connect() .then(() => { console.log('Connected to PostgreSQL database!'); }) .catch((err) => { console.error('Error connecting to the database:', err); });

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});