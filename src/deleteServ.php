<?php
    header("Content-type: text/html; charset=utf-8");
    $conn = new mysqli("localhost" , "root" , "0000" , "myhtmldb");
    mysqli_query($conn,"SET NAMES 'UTF8'");
    $facId = $_POST['facid'];

    if(doThis($facId))
        echo "success";
    else echo "fail";

    function doThis($facId) {
        $sql_1 = "DELETE FROM FACINFO WHERE FACNO = '$facId'";
        $sql_2 = "DELETE FROM BORROW WHERE FACNO = '$facId'";
        return deleteValue($sql_1)&&deleteValue($sql_2);
    }

    function deleteValue($sql) {
        global $conn;
        return mysqli_query($conn,$sql);
    }