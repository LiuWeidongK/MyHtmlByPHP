<?php
/**
 * Created by PhpStorm.
 * User: Misaya
 * Date: 2017/4/22
 * Time: 15:45
 */

include_once 'connMySQL.php';
header("Content-type: text/html; charset=utf-8");

$facid = $_POST['facid'];
$userid = $_POST['userid'];

$conn = connMySQL::getConn();

$sql = "SELECT *FROM borrow WHERE username = '$userid' AND FacNo = '$facid'";
$result = mysqli_query($conn,$sql);
if($row = mysqli_fetch_array($result)){
    $edate = date('20y-m-d',strtotime('+28 Day',strtotime($row['edate'])));
    $use = $row['uselong'] + 28;
    if($row['renew']==0) {
        $sql_ = "UPDATE borrow SET edate='$edate',uselong='$use',state=100,renew=TRUE WHERE username='$userid' AND FacNo='$facid'";
        if(mysqli_query($conn,$sql_))
            echo "true";
        else echo "false";
    }
    else echo "false";
}else echo "false";