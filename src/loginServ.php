<?php
    include ('connMySQL.php');
    header("Content-type: text/html; charset=utf-8");
    $class = new connMySQL();
    $conn = $class->getConn();
    mysqli_query($conn,"SET NAMES 'UTF8'");

    $username = $_REQUEST['username'];
    $password = md5($_REQUEST['password']);

    if(login($username,$password)) {
        session_start();
        $_SESSION['username'] = $username;
        echo "true";
    } else echo "false";

    function login($username,$password) {
        global $conn;
        $result = mysqli_query($conn,"select * from login where username = '$username'");
        if($row = mysqli_fetch_array($result)) {
            if($row['password'] == $password)
                return true;
            else return false;
        } else {
            if(cmp($username,$password)) {
                return insert_login($username,$password)&&insert_personal($username);
            } else return false;
        }
    }

    function insert_login($username,$password) {
        global $conn;
        $sql = "insert into login values ('$username','$password',FALSE ,FALSE )";
        return mysqli_query($conn,$sql);
    }

    function insert_personal($username) {
        global $conn;
        $sql = "insert into personal (username) values ('$username')";
        return mysqli_query($conn,$sql);
    }

    function cmp($username,$password) {
        return md5($username) == $password;
    }
