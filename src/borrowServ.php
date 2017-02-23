<?php
    header("Content-type: text/html; charset=utf-8");
    //$conn = new mysqli("localhost" , "root" , "0000" , "myhtmldb");
    $conn = new mysqli("bdm264098108.my3w.com" , "bdm264098108" , "liu123456" , "bdm264098108_db");
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
        $sql = "INSERT INTO BORROW (USERNAME,SDATE,FACNO,USELONG,AIM) VALUES ('$username','$date','$borrowFacId','$useLong','$useAim')";
        return mysqli_query($conn,$sql);
    }

    function updateUsed() {
        global $conn,$borrowFacId;
        $sql = "UPDATE FACINFO SET USED = USED + 1 WHERE FACNO = '$borrowFacId'";
        return mysqli_query($conn,$sql);
    }