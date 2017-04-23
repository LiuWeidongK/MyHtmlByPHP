<?php
/**
 * Created by PhpStorm.
 * User: Misaya
 * Date: 2017/4/22
 * Time: 15:16
 */
include_once 'connMySQL.php';
header("Content-type: text/html; charset=utf-8");

$facid = $_POST['facid'];
$userid = $_POST['userid'];

$conn = connMySQL::getConn();
$sql = "UPDATE borrow SET state = 103 WHERE username = '$userid' AND FacNo = '$facid'";
if(mysqli_query($conn,$sql)){
    echo "true";
}else echo "false";