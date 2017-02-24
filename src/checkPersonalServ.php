<?php
    include ('connMySQL.php');
    header("Content-type: text/html; charset=utf-8");
    $class = new connMySQL();
    $conn = $class->getConn();
    mysqli_query($conn,"SET NAMES 'UTF8'");

    session_start();
    $username = $_SESSION['username'];
    $sql = "SELECT * FROM login WHERE username = '$username'";
    $result = mysqli_query($conn,$sql);
    if($row = mysqli_fetch_array($result)) {
        if($row['complete'] == true)
            echo "true";
        else echo "false";
    } else echo "false";