<?php
    header("Content-type: text/html; charset=utf-8");
    $conn = new mysqli("localhost" , "root" , "0000" , "myhtmldb");
    mysqli_query($conn,"SET NAMES 'UTF8'");
    $labNo = $_POST['upinputLabNo'];
    $facNo = $_POST['upinputFacNo'];
    $facName = $_POST['upinputFacName'];
    $facMod = $_POST['upinputFacMod'];
    $stock = $_POST['upStock'];
    $sql = "UPDATE FACINFO SET LABNO = '$labNo',FACNAME = '$facName',FACMODEL = '$facMod',STOCK = '$stock'WHERE FACNO = '$facNo'";

    if(mysqli_query($conn,$sql))
        echo "success";
    else echo "fail";
