import express from "express";
import pg from 'pg';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new pg.Client({ user: 'postgres', host: 'localhost', database: 'audioplayerapp', password: 'master151', port: 5432,});
client.connect() .then(() => { console.log('Connected to PostgreSQL database!'); }) .catch((err) => { console.error('Error connecting to the database:', err); });

app.get('/', async (req, res) => {
  res.send('Welcome to my server!');
});

app.post('/api/searchmusic', async (req, res) => {

  var statement = 'select * from music WHERE name LIKE ';
  statement += "'" + req.body.mname + "%" + "'";
  if(req.body.mname.length == 0)
    statement = 'select * from music limit 5';
  var result = await client.query(statement);
  if(result.rows != null)
      res.status(200).json({query:result,nq:1})
  else if(result.rows == null){
      res.status(200).json({query:result,nq:-1})
  }
});

app.post('/api/fetchInList',async function (req, res) {
  
  var inputs = req.body.inputs;
  console.log(inputs);
  var inputlist = inputs.split(",");
  var statement = 'select * from music where ';
  let n=inputlist.length;
  for(let i=0; i<n; i++){
    statement += 'id= ';
    statement += inputlist[i];
    if(i != n-1)
      statement += ' or ';
  }
  var ret =  await client.query(statement);
  console.log(statement)
  if(ret != null){
     res.status(200).json({'result':'success','queryret':ret.rows})
  }
  
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
