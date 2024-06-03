import express from "express";
import pg from 'pg';

const app = express();
const port = 3000;

const client = new pg.Client({ user: 'postgres', host: 'localhost', database: 'AudioPlayerApp', password: 'master151', port: 5432,});
client.connect() .then(() => { console.log('Connected to PostgreSQL database!'); }) .catch((err) => { console.error('Error connecting to the database:', err); });

app.get('/', async (req, res) => {
  var ret = await client.query('select count(name) from music');
  res.status(200).json(ret.rows);
  //res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});