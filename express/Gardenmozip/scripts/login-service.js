// login-service.js

var mariadb = require('mariadb');
//var bkfd2Password = require('pbkdf2-password');
//var hasher = bkfd2Password();

const path = require("path");
var  express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mariadb.createPool({
     host: '127.0.0.1', 
     port : 3306,
     user : 'garden',
     password : 'garden',
     connectionLimit: 5,
     database : 'gardenbase' 
});


// 로그인 서비스
exports.SignIn = async function(req){
     var json = {};
     json.code = 0;
     var conn = await pool.getConnection(); 
     var id = req.body.id;
     var password = req.body.password;

     var query = "SELECT id, password, name, age, gender, email FROM user where id='" + id + "';";
     var rows = await conn.query(query); // 쿼리 실행

     if(rows[0]) //아이디가 있는 경우 
     {    var userPass = rows[0].password;

          return  new Promise((resolve, reject) =>{
                    if(password != userPass)
                    {
                         json.code = 100;
                         json.msg = "패스워드 일치하지 않습니다.(운영환경 : ID 및 비밀번호가 일치하지 않습니다)";
                         json.data = {};
                    }
                    else
                    {    
                         json.code = 0;
                         json.data = rows[0];
                         json.msg = "로그인 완료";
                    }
                    console.log(json);
                    
                    resolve(json);
          });
     }
     else
     {
          json.code = 100;
          json.msg = "ID 일치하지 않습니다.";
          json.data = {};
          console.log(json);
     }
     return json;
     
};


// 회원가입
exports.SignUp = async function(req) {
     var resultcode = 0;
     var conn = await pool.getConnection();    

     var id = req.body.id;
     var password = req.body.password;
     var name = req.body.name;
     var age = req.body.age;
     var gender = req.body.gender;
     var email = req.body.email;

     var query = "SELECT id, password, name, age, gender, email FROM user where id='" + id + "';";
     var rows = await conn.query(query);

     if (rows[0] == undefined) {
          var insertQuery = "INSERT INTO user (id, password, name, age, gender, email) VALUES ('" + id + "','" + password + "','" + name + "', '" + age + "', '" + gender + "','" + email + "');";
          await conn.query(insertQuery);
     } else {
          resultcode = 100;
     }

     conn.release();

     return resultcode;
     };

     
exports.Basket = async function(req) {
     var conn = await pool.getConnection();    
     var resultcode = 0;
     var id = req.session.userid;
     var item = req.body.name;
     var image = req.body.img;
     var price = req.body.price;
     
     var query = "SELECT id, item, image, price FROM basket WHERE id='" + id + "' AND item='" + item + "';";
     var results = await conn.query(query);

     if (results.length === 0) {
     var insertQuery = "INSERT INTO basket (id, item, image, price) VALUES ('" + id + "','" + item+ "','" + image+ "','" + price+ "');";
     await conn.query(insertQuery);
     } else {
          resultcode = 100;
     }
          
     conn.release();
     
     return resultcode;
     };
     