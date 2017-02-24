<?php
    include ('connMySQL.php');
    header("Content-type: text/html; charset=utf-8");
    $class = new connMySQL();
    $conn = $class->getConn();
    mysqli_query($conn,"SET NAMES 'UTF8'");

    $result = array();
    $sign = true;
    $facList = $_POST['facList'];   //Array

    foreach ($facList as $item) {
        $result[] = doThis($item);
    }

    foreach ($result as $item) {
        if(!$item)
            $sign = false;
    }

    if($sign == true)
        echo "success";
    else echo "fail";

    function doThis($facId) {
        $sql_1 = "DELETE FROM facinfo WHERE FacNo = '$facId'";
        $sql_2 = "DELETE FROM borrow WHERE FacNo = '$facId'";
        return deleteValue($sql_1)&&deleteValue($sql_2);
    }

    function deleteValue($sql) {
        global $conn;
        return mysqli_query($conn,$sql);
    }