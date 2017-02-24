<?php
    include ("createKeyClass.php");
    header("Content-type: text/html; charset=utf-8");

    $sign = $_POST['sign'];
    $createKey = new createKeyClass();

    switch ($sign) {
        case '1':
            $createN = $_POST['creatNum'];
            echo $createKey -> getKey($createN);
            break;
        case '2':
            echo $createKey -> getSQLKey();
            break;
        case '3':
            $key = $_POST['keyNum'];
            if($createKey -> checkKey($key))
                echo "true";
            else echo "false";
            break;
    }