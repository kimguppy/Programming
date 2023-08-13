<?php
# db 접속
include_once("connect.php");

# form 데이터 읽어오기
$id = $_POST["id"];
$password = $_POST["password"];
$name = $_POST["name"];
$age = $_POST["age"];
$gender = $_POST["gender"];
$email = $_POST["email"];

# insert sql 작성
$sql = "INSERT INTO user (id, password, name, age, gender, email) VALUES('$id', '$password', '$name','$age', '$gender', '$email')";

?>