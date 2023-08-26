// login-router.js
var controller_main = require("./login-controller.js");

const path = require("path");
var  express = require("express");
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post("/logup", async function(req,res){
    // 로그인 확인을 위해 컨트롤러 호출
    var result = await controller_main.SignIn(req,res); 
    res.send(result);
});

router.post("/basket", async function(req,res){
    // 장바구니을 위해 컨트롤러 호출
    var result = await controller_main.Basket(req,res); 
    res.send(result);
});


// 로그아웃
router.get("/logout", function(req,res){
    console.log("clear cookie");
    // 로그아웃 쿠키 삭제
    res.clearCookie('userid');
    res.clearCookie('username');

    // 세션정보 삭제
    console.log("destroy session");
    req.session.destroy();

    const filePath = path.join(__dirname, '../main.html');
	res.sendFile(filePath);

    
});


router.post("/signup", async function(req,res){
   // 회원가입 컨트롤러 호출
    var result = await controller_main.SignUp(req,res);
    res.send(result);
});

module.exports = router;