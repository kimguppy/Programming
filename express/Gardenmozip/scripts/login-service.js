// login-service.js

var mariadb = require('mariadb');
//var bkfd2Password = require('pbkdf2-password');
//var hasher = bkfd2Password();

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
     var userid = req.body.userid;
     var password = req.body.password;

     var query = "SELECT userid, password, salt, name FROM member where userid='" + userid +"' ;";

     var rows = await conn.query(query); // 쿼리 실행
     if(rows[0])
     {
           //저장된 password 와  hash password 가 같은지를 체크하여 로그은 성공, 실패 처리
          var userSalt = rows[0].salt;
          var userPass = rows[0].password;
          
          return  new Promise((resolve, reject) =>{
               hasher({password:password, salt:userSalt}, (err, pass, salt, hash) => {

                    if(hash != userPass)
                    {
                         json.code = 100;
                         json.msg = "패스워드 일치하지 않습니다.(운영환경 : ID 및 비밀번호가 일치하지 않습니다)";
                         json.data = {};
                    }
                    else
                    {
                         json.data = rows[0];
                    }         
                    resolve(json);
               });
          });
     }
     else
     {
          json.code = 100;
          json.msg = "ID 일치하지 않습니다.";
          json.data = {};
          return json;
     }
     
};



// 회원가입
exports.SignUp = async function(req,res){
     var resultcode = 0;

     var conn = await pool.getConnection();    

     var id = req.body.id;
     var password = req.body.password;
     var name = req.body.name;
     var age = req.body.age;
     var gender = req.body.gender;
     var email = req.body.email;

     var query = "SELECT id, password, name, age, gender, email FROM user where id='" + id +"';";
     var rows = await conn.query(query); // 쿼리 실행

     if(rows[0] == undefined)
     {
        //hasher({password:password}, async (err, pass, salt, hash) => {//
            var query = "INSERT INTO user (id, password, name, age, gender, email) VALUES ('" + id + "','" + password + "','" + name + "', '" + age + "', '" + gender + "','" + email + "');";
            var rows = await conn.query(query); // 쿼리 실행
             //});//
     }
     else
     {
          // 이미 있음
          resultcode = 100;
     }



     return resultcode;
};