#!/usr/bin/node
//서버라고 생각해야하네
const express = require('express');
var mariadb = require('mariadb');
const path = require('path'); // path 모듈 불러오기
const mysql = require('mysql');
const dbconfig = require('./config/dbinfo.js');
const connection = mysql.createConnection(dbconfig);

const app = express();
const cors = require('cors'); 
const port = 3000;

const pool = mariadb.createPool({
    host: '127.0.0.1', 
    port : 3306,
    user : 'garden',
    password : 'garden',
    connectionLimit: 5,
    database : 'gardenbase' 
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require("express-session");

app.use(session({
    secret :"node-session",
    resave:false,
    saveUninitialized:true
}))

const router = require('./Gardenmozip/scripts/login-router.js'); // 라우터 설정을 별도의 파일로 분리
app.use('/', router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//데이터베이스에 새로운 유저를 추가하거나 처리하는 로직을 작성할 수 있습니다.


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

app.get('/header', (req, res) => {
    if(req.session.isLogined){
    const filePath = path.join(__dirname, 'Gardenmozip', '/header2.html');
	res.sendFile(filePath);
    }else{
        const filePath = path.join(__dirname, 'Gardenmozip', '/header.html');
        res.sendFile(filePath);
        }
});
app.get('/footer', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/footer.html');
    res.sendFile(filePath);
});

app.get('/package', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/package.html');
	res.sendFile(filePath);
});

app.get('/mypage', (req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/mypage.html');
	res.sendFile(filePath);
});

app.get('/getuserdata', (req, res) => {
    // 세션에서 값을 가져옵니다.
    const mynameValue = req.session.username;
    const myemailValue = req.session.useremail;

    // JSON 형태로 데이터 전송
    res.json({ mynameValue, myemailValue });
});

app.get('/getbasket', async (req, res) => {
        var conn = await pool.getConnection();
        var query = "SELECT * FROM basket;";
        var rows = await conn.query(query);

        const basket1 = rows[0];
        const basket2 = rows[1];
        const basket3 = rows[2];

        console.log( rows[0]);
        // JSON 형태로 데이터 전송
        res.json({ basket1, basket2, basket3 });
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

app.get('/join', (_req, res) => {
    const filePath = path.join(__dirname, 'Gardenmozip', '/Join.html');
	res.sendFile(filePath);
});

app.get('/', (req, res) => {
	const filePath = path.join(__dirname, 'Gardenmozip', '/main.html');
	res.sendFile(filePath);
});

app.get('/print-session', (req, res) => {
    if (req.session.id) {
        res.send(`isLogined: ${req.session.isLogined}, id: ${req.session.id}`);
    } else {
        res.send('Session data not found');
    }
});

app.get('/get-session', (req, res) => {
    const sessionData = {
        isLogined: req.session.isLogined || false
    };
    res.json(sessionData);
});