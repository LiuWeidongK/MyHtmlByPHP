<?php
    header("Content-type: text/html; charset=utf-8");
    $myPass = md5("302711");
    $pass = md5($_POST['pass']);

    if($myPass==$pass)
        echo "true";
    else echo "false";