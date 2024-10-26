const express = require('express');
const db = require('../db');  // เชื่อมต่อฐานข้อมูลจาก server.js
const e = require('express');
const app = express();

// Register
app.post('/register', (req, res) =>{
  const newUser = {username, password, email} = req.body;
  db.query("INSERT INTO users (username, password, email) VALUE (?, ?, ?)", 
    [newUser.username, newUser.password, newUser.email], 
    (err, results) =>{
      console.log(results)
      if(err){
          res.status(400).json({msg: "ฐานข้อมูลขัดข้อง, ไม่สามารถลงทะเบียนได้"});
          console.log(err)
      }
      res.json(results);
  })
});

//Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT username FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      console.log(err);
      if (err) {
        res.status(400).json({ msg: "ฐานข้อมูลขัดข้อง, ไม่สามารถ log in ได้" });
        console.log(err);
      }
      res.json(results);
    }
  );
});

//สร้าง API สำหรับดึงข้อมูลจากตาราง ie_data
app.get('/ie_data', (req, res) => {
  const query = 'SELECT * FROM ie_data';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
      console.log(err);
      return;
    }
    // ส่งข้อมูลออกเป็น JSON
    res.json(results);
  });
});
module.exports = app;

