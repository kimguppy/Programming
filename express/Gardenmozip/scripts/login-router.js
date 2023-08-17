// login-router.js

const path = require("path");
var  express = require("express");
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

var controller_main = require("./login-controller.js");


router.post("/logup", async function(req,res){
    // 로그인 확인을 위해 컨트롤러 호출
    var result = await controller_main.SignIn(req,res);   
    res.send(result);
});

// 로그아웃
router.get("/logout", function(req,res){
    console.log("clear cookie");
    // 로그아웃 쿠키 삭제
    res.clearCookie('id');
    res.clearCookie('password');

    // 세션정보 삭제
    console.log("destroy session");
    req.session.destroy();
    
    res.sendFile(path.join(__dirname , "../login.html"));
});



router.post("/signup", async function(req,res){
   // 회원가입 컨트롤러 호출
    var result = await controller_main.SignUp(req,res);
    res.send(result);
});

module.exports = router;