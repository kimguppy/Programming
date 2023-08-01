const express = require('express');
const path = require('path'); // path 모듈 불러오기
const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const connection = mysql.createConnection(dbconfig);
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
// 	connection.query('SELECT * FROM ex', (error, rows) => {
// 		if (error) throw error;
// 		res.send(rows);
// 	});
// });

app.listen(port, () => {
	console.log(`Example app listening http://localhost:${port}`);
});

app.get('/styles/:name', (req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip/styles/', req.params.name);
    res.sendFile(filePath);
});

app.get('/images/:name', (req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip/imeges/', req.params.name);
	res.sendFile(filePath);
});

app.get('/scripts/:name', (req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip/scripts/', req.params.name);
    res.set('Content-Type', 'application/javascript');
    res.sendFile(filePath);
});

app.get('/header', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/header.html');
	res.sendFile(filePath);
});


app.get('/', (_req, res) => {
	const filePath = path.join(__dirname, 'Gardenmozip/', 'main.html');
	res.sendFile(filePath);
});