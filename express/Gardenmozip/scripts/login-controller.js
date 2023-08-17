// login-controller.js

var  service_main = require("./login-service.js");

const path = require("path");
var  express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true  }));

// 회원로그인 컨트롤러
exports.SignIn =  async function(req,res){

     var result =  await service_main.SignIn(req);
     msg = "로그인완료";
     console.log(msg);

     if(result.code == 0)
     {
          res.cookie('username', result.data.name);
          res.cookie('userid', result.data.id);
          console.log(result);
     }
     return result;

};


// 회원가입 컨트롤러
exports.SignUp =  async function(req,res){
     console.log( req.body);

     var result =  await service_main.SignUp(req);     

     var msg = "가입완료";
     if(result ==100)
     {
          msg = "이미 존재하는 ID 입니다.";
     }
     
     var json = {code:result, msg:msg};
     console.log(json);

     return json;
};