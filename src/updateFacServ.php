<?php
    include ('connMySQL.php');
    header("Content-type: text/html; charset=utf-8");
    $class = new connMySQL();
    $conn = $class->getConn();
    mysqli_query($conn,"SET NAMES 'UTF8'");

    $labNo = $_POST['upinputLabNo'];
    $facNo = $_POST['upinputFacNo'];
    $facName = $_POST['upinputFacName'];
    $facMod = $_POST['upinputFacMod'];
    $stock = $_POST['upStock'];
    $sql = "UPDATE facinfo SET LabNo = '$labNo',FacName = '$facName',FacModel = '$facMod',Stock = '$stock'WHERE FacNo = '$facNo'";

    if(mysqli_query($conn,$sql))
        echo "success";
    else echo "fail";
