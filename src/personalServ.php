<?php
    header("Content-type: text/html; charset=utf-8");
    $conn = new mysqli("localhost" , "root" , "0000" , "myhtmldb");
    mysqli_query($conn,"SET NAMES 'UTF8'");
    session_start();
    $username = $_SESSION['username'];
    $college = $_POST['collegeInput'];
    $name = $_POST['nameInput'];
    $telephone = $_POST['telInput'];

    if(workIt())
        echo "success";
    else echo "fail";

    function workIt() {
        if(checkFull())
            return updatePersonValue()&&updateComplete(true);
        else
            return updatePersonValue()&&updateComplete(false);
    }

    function updatePersonValue() {
        global $conn,$username,$college,$name,$telephone;
        $sql = "UPDATE PERSONAL SET COLLEGE = '$college',NAME = '$name',TELEPHONE = '$telephone' WHERE USERNAME = '$username'";
        return mysqli_query($conn,$sql);
    }

    function updateComplete($sign) {
        global $conn,$username;
        $sql = "UPDATE LOGIN SET COMPLETE = '$sign' WHERE USERNAME = '$username'";
        return mysqli_query($conn,$sql);
    }

    function checkFull() {
        global $college,$name,$telephone;
        return !empty(trim($college))&&
            !empty(trim($name))&&
            !empty(trim($telephone));
    }