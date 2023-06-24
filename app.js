const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'step-addition',
  password: 'eoqkr123',
  port: 5432, // default Postgres port
});

app.get('/', (req, res) => {
  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    pool.end(); // close the connection after the query is executed
  });
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});