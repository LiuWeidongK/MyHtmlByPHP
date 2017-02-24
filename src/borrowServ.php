<?php
    include ('connMySQL.php');
    header("Content-type: text/html; charset=utf-8");
    $class = new connMySQL();
    $conn = $class->getConn();
    mysqli_query($conn,"SET NAMES 'UTF8'");

    session_start();
    $username = $_SESSION['username'];
    $date = date('20y-m-d',time());
    $useLong = $_POST['UseDate'];
    $borrowFacId = $_POST['borrowFacID'];
    $useAim = $_POST['UseAim'];

    if(insertValue()&&updateUsed())
        echo "success";
    else echo "fail";

    function insertValue() {
        global $conn,$username,$date,$borrowFacId,$useLong,$useAim;
        $sql = "INSERT INTO borrow VALUES ('$username','$date','$borrowFacId','$useLong','$useAim')";
        return mysqli_query($conn,$sql);
    }

    function updateUsed() {
        global $conn,$borrowFacId;
        $sql = "UPDATE facinfo SET Used = Used + 1 WHERE FacNo = '$borrowFacId'";
        return mysqli_query($conn,$sql);
    }