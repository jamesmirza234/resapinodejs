const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 

app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs'
});
 

conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});
 
app.get('/api/user',(req, res) => {
  let sql = "SELECT * FROM tbl_user";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 

app.get('/api/user/:id',(req, res) => {
  let sql = "SELECT * FROM tbl_user WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 

app.post('/api/user',(req, res) => {
  let data = {name: req.body.name, dob: req.body.dob, address: req.body.address, description: req.body.description,createdAt: req.body.createdAt};
  let sql = "INSERT INTO tbl_user SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 

app.put('/api/user/:id',(req, res) => {
  let sql = "UPDATE tbl_user SET name='"+req.body.name+"', dob='"+req.body.dob+"' , address='"+req.body.address+"' , description='"+req.body.description+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 

app.delete('/api/user/:id',(req, res) => {
  let sql = "DELETE FROM tbl_user WHERE id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});