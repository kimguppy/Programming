#!/usr/bin/node
const express = require('express');
const path = require('path'); // path 모듈 불러오기
const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const connection = mysql.createConnection(dbconfig);
const app = express();
const cors = require('cors'); 
const port = 3000;

app.use(
        cors({
                origin: 'http://35.175.137.182:3000', // 여기서 따옴표 수정
                credentials: true,
        }));


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
app.get('/footer', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/footer.html');
    res.sendFile(filePath);
});

app.get('/package', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/package.html');
	res.sendFile(filePath);
});

app.get('/mypage', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/mypage.html');
	res.sendFile(filePath);
});

app.get('/thema', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/thema.html');
	res.sendFile(filePath);
});

app.get('/vacation', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/vacation.html');
	res.sendFile(filePath);
});

app.get('/hotel', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/hotel.html');
	res.sendFile(filePath);
});

app.get('/login', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/login.html');
	res.sendFile(filePath);
});

app.get('/center', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/center.html');
	res.sendFile(filePath);
});

app.get('/', (_req, res) => {
	const filePath = path.join(__dirname, 'Gardenmozip', '/main.html');
	res.sendFile(filePath);
});
