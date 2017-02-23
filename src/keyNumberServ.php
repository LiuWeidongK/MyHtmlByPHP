<?php
    header("Content-type: text/html; charset=utf-8");
    //$conn = new mysqli("localhost" , "root" , "0000" , "myhtmldb");
    $conn = new mysqli("bdm264098108.my3w.com" , "bdm264098108" , "liu123456" , "bdm264098108_db");
    mysqli_query($conn,"SET NAMES 'UTF8'");
    session_start();
    $username = $_SESSION['username'];
    $keys = $_POST['keys'];

    if(checkKeys())
        echo "success";
    else echo "fail";

    function checkKeys() {
        global $conn,$username,$keys;
        $sql = "SELECT *FROM KEYNUMBER WHERE KEYVALUE = '$keys' AND USED = '$username'";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result)) {
            $sql_1 = "UPDATE KEYNUMBER SET USED = TRUE WHERE KEYVALUE = '$keys'";
            $sql_2 = "UPDATE LOGIN SET USERTYPE = TRUE WHERE USERNAME = '$username'";
            return updateKeyValue($sql_1)&&updateKeyValue($sql_2);
        } else return false;
    }

    function updateKeyValue($sql) {
        global $conn;
        return mysqli_query($conn,$sql);
    }