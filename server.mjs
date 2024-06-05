import express from "express";
import pg from 'pg';

const app = express();
const port = 3000;

const client = new pg.Client({ user: 'postgres', host: 'localhost', database: 'audioplayerapp', password: 'master151', port: 5432,});
client.connect() .then(() => { console.log('Connected to PostgreSQL database!'); }) .catch((err) => { console.error('Error connecting to the database:', err); });

app.get('/', async (req, res) => {
  res.send('Welcome to my server!');
});

app.get('/api/getMusic',async function (req, res) {
  var statement = 'select * from music mu';
  var musictype = ''
  if(req.query.type){
     musictype = req.query.type;
  }
  if(musictype != ''){
     statement += ' where mu.type = ' + "'" + musictype + "'"
  }
  var ret =  await client.query(statement);
  console.log(statement)
  if(ret != null){
     res.status(200).json({'result':'success','queryret':ret.rows})
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});