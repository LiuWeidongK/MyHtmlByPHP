<?php
/**
 * Created by PhpStorm.
 * User: Misaya
 * Date: 2017/4/22
 * Time: 16:36
 */
include_once 'connMySQL.php';
include_once 'Remind.php';
header("Content-type: text/html; charset=utf-8");

$type = $_POST['type'];

switch ($type){
    case '0':           //单个提醒
        $uNo = $_POST['userid'];
        $fNo = $_POST['facid'];
        echo Remind::send($uNo,$fNo);
        break;
    case '1':           //批量提醒
        break;
}

