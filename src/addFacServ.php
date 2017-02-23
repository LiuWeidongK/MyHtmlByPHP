<?php
    header("Content-type: text/html; charset=utf-8");
    //$conn = new mysqli("localhost" , "root" , "0000" , "myhtmldb");
    $conn = new mysqli("bdm264098108.my3w.com" , "bdm264098108" , "liu123456" , "bdm264098108_db");
    mysqli_query($conn,"SET NAMES 'UTF8'");
    $labNo = $_POST['addLabNo'];
    $facNo = $_POST['addFacNo'];
    $facName = $_POST['addFacName'];
    $facMod = $_POST['addFacMod'];
    $haveNum = $_POST['addHaveNum'];
    $dataInfo = $_POST['addDataInfo'];

    if(checkRepeat()) {
        if(insertFacValue())
            echo "success";
        else echo "insertFail";
    } else echo "repeatFail";

    function checkRepeat() {
        global $conn,$facNo;
        $sql = "SELECT * FROM FACINFO WHERE FACNO = '$facNo'";
        $result = mysqli_query($conn,$sql);
        return !mysqli_num_rows($result);
    }

    function insertFacValue() {
        global $conn,$labNo,$facNo,$facName,$facMod,$haveNum,$dataInfo;
        $sql = "INSERT INTO FACINFO (LABNO,FACNO,FACNAME,FACMODEL,STOCK,USED,INFORMATION) VALUES ('$labNo','$facNo','$facName','$facMod',$haveNum,0,'$dataInfo')";
        return mysqli_query($conn,$sql);
    }