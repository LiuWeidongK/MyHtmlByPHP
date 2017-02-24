<?php
    include ('connMySQL.php');
    header("Content-type: text/html; charset=utf-8");
    $class = new connMySQL();
    $conn = $class->getConn();
    mysqli_query($conn,"SET NAMES 'UTF8'");

    session_start();
    $username = $_SESSION['username'];
    $keys = $_POST['keys'];

    if(checkKeys())
        echo "success";
    else echo "fail";

    function checkKeys() {
        global $conn,$username,$keys;
        $sql = "SELECT *FROM keynumber WHERE keyvalue = '$keys' AND USED = FALSE ";
        $result = mysqli_query($conn,$sql);
        if(mysqli_num_rows($result)) {
            $sql_1 = "UPDATE keynumber SET used = TRUE WHERE keyvalue = '$keys'";
            $sql_2 = "UPDATE login SET usertype = TRUE WHERE username = '$username'";
            return updateKeyValue($sql_1)&&updateKeyValue($sql_2);
        } else return false;
    }

    function updateKeyValue($sql) {
        global $conn;
        return mysqli_query($conn,$sql);
    }