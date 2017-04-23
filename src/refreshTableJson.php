<?php
    include ('connMySQL.php');
    header("Content-type: text/html; charset=utf-8");
    $class = new connMySQL();
    $conn = $class->getConn();
    mysqli_query($conn,"SET NAMES 'UTF8'");

    session_start();
    $username = $_SESSION['username'];
    $No = $_POST['No'];

    switch ($No) {
        case '1':
        case '2':
            $array = array();
            $sql = "SELECT * FROM facinfo";
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
            $type = $_POST['type'];
            if($type=='1')
                $sql = "SELECT * FROM borrow,personal,facinfo WHERE borrow.username = personal.username AND facinfo.FacNo = borrow.FacNo";
            else if($type==0)
                $sql = "SELECT * FROM borrow,personal,facinfo WHERE borrow.username = personal.username AND facinfo.FacNo = borrow.FacNo AND personal.username = '$username'";
            $result = mysqli_query($conn,$sql);
            while($row = mysqli_fetch_array($result)) {
                $arr = [
                    'ids' => $row['username'],
                    'names' => $row['name'],
                    'college' => $row['college'],
                    'sdate' => $row['sdate'],
                    'edate' => $row['edate'],
                    'facno' => $row['FacNo'],
                    'facname' => $row['FacName'],
                    'state' => $row['state'],
                    'tele' => $row['telephone'],
//                    'uselong' => $row['uselong'],
                    'aim' => $row['aim']
                ];
                $array[] = $arr;
            }
            echo json_encode($array,JSON_UNESCAPED_UNICODE);
            break;
        case '4':
            $sql = "SELECT * FROM personal WHERE username = '$username'";
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