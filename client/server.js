const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback');


const app = express();
const port = 3000;
app.use(history());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.static(path.join(__dirname, './dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist'));
});

app.post('/api/query', (req, res) => {
  console.log('quering');
  console.log(req.body);
  let connection = mysql.createConnection({
    host: 'uw.mysql.database.azure.com',
    user: 'group_mu@uw',
    password: 'Database1',
    database: 'css_475',
  });

  connection.connect();
  return connection.query(req.body.query, (error, results, fields) => {
        if (error) throw error;
        console.log("result was " + JSON.stringify(results, null, 2));
        res.send(results);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
