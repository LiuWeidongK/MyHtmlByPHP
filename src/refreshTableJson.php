<?php
    header("Content-type: text/html; charset=utf-8");
    $conn = new mysqli("localhost" , "root" , "0000" , "myhtmldb");
    mysqli_query($conn,"SET NAMES 'UTF8'");
    session_start();
    $username = $_SESSION['username'];
    $No = $_POST['No'];

    switch ($No) {
        case '1':
        case '2':
            $array = array();
            $sql = "SELECT * FROM FACINFO";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_array($result)) {
                $arr = [
                    'LabNo' => $row['LabNo'],
                    'FacNo' => $row['FacNo'],
                    'FacName' => $row['FacName'],
                    'FacModel' => $row['FacModel'],
                    'Stock' => $row['Stock'],
                    'Used' => $row['Used'],
                    'Information' => $row['Information']
                ];
                $array[] = $arr;
            }
            echo json_encode($array,JSON_UNESCAPED_UNICODE);
            break;
        case '3':
            $array = array();
            $sql = "SELECT * FROM BORROW,PERSONAL,FACINFO WHERE BORROW.USERNAME = PERSONAL.USERNAME AND FACINFO.FACNO = BORROW.FACNO";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_array($result)) {
                $arr = [
                    'ids' => $row['username'],
                    'names' => $row['name'],
                    'college' => $row['college'],
                    'sdate' => $row['sdate'],
                    'facname' => $row['FacName'],
                    'tele' => $row['telephone'],
                    'uselong' => $row['uselong'],
                    'aim' => $row['aim']
                ];
                $array[] = $arr;
            }
            echo json_encode($array,JSON_UNESCAPED_UNICODE);
            break;
        case '4':
            $sql = "SELECT * FROM PERSONAL WHERE USERNAME = '$username'";
            $result = mysqli_query($conn,$sql);
            if($row = mysqli_fetch_array($result)) {
                $arr = array(
                    'college' => $row['college'],
                    'name' => $row['name'],
                    'telphone' => $row['telephone']
                );
                echo json_encode($arr,JSON_UNESCAPED_UNICODE);
            }
            break;
    }