<?php
    include ('connMySQL.php');
    header("Content-type: text/html; charset=utf-8");
    $class = new connMySQL();
    $conn = $class->getConn();
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
        $sql = "SELECT * FROM login WHERE username = '$username'";
        $result = mysqli_query($conn,$sql);
        if($row = mysqli_fetch_array($result)) {
            return $row['password']==$oldpass;
        } else return false;
    }

    function updateNewPass() {
        global $conn,$username,$newpass;
        $sql = "UPDATE login SET password = '$newpass' WHERE username = '$username'";
        return mysqli_query($conn,$sql);
    }