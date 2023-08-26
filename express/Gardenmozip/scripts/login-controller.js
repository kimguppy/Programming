// login-controller.js
var  service_main = require("./login-service.js");
// var service_main은 모듈을 가져온 후 해당 모듈의 기능을 사용하기 위해 사용될 변수입니다. 
// 이 변수를 사용하여 login-service.js 모듈의 함수나 객체 등을 호출하거나 사용할 수 있습니다.

var  express = require("express");
const session = require('express-session');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
     secret: 'your-secret-key', // 세션 암호화에 사용되는 키
     resave: false,
     saveUninitialized: true
}));

// 회원로그인 컨트롤러
exports.SignIn =  async function(req,res){
     var result =  await service_main.SignIn(req);
     msg = "로그인완료";
     console.log(msg); //왜 이건 터미널에 뜨냐 :: express 쓰는 것들은 모두 서버거든

     if(result.code == 0)
     { 
          res.cookie('username', result.data.name);
          res.cookie('userid', result.data.id);
          req.session.username = result.data.name;
          req.session.userid = result.data.id;
          req.session.isLogined = true;
          console.log(result);
     }
     return result;
};


// exports는 Node.js의 모듈 시스템에서 사용되는 객체로, 
// 모듈 내에서 외부로 내보내고 싶은 함수, 객체, 변수 등을 설정할 수 있습니다.
// 모듈을 다른 파일에서 사용할 수 있게 하기 위해 사용됩니다.
// exports를 사용하여 해당 함수를 내보내야 합니다.

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