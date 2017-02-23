<?php
    header("Content-type: text/html; charset=utf-8");
    //$conn = new mysqli("localhost" , "root" , "0000" , "myhtmldb");
    $conn = new mysqli("bdm264098108.my3w.com" , "bdm264098108" , "liu123456" , "bdm264098108_db");
    mysqli_query($conn,"SET NAMES 'UTF8'");
    session_start();
    $username = $_SESSION['username'];
    $oldpass = md5($_POST['oldPass']);
    $newpass = md5($_POST['newPass']);

    if(checkOldPass()) {
        if(updateNewPass())
            echo "success";
        else echo "updateFail";
    } else echo "checkFail";

    function checkOldPass() {
        global $conn,$username,$oldpass;
        $sql = "SELECT * FROM LOGIN WHERE USERNAME = '$username'";
        $result = mysqli_query($conn,$sql);
        if($row = mysqli_fetch_array($result)) {
            return $row['password']==$oldpass;
        } else return false;
    }

    function updateNewPass() {
        global $conn,$username,$newpass;
        $sql = "UPDATE LOGIN SET PASSWORD = '$newpass' WHERE USERNAME = '$username'";
        return mysqli_query($conn,$sql);
    }