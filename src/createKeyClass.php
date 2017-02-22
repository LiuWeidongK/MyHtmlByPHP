<?php

class createKeyClass
{
    private function getConn() {
        $conn = new mysqli("localhost" , "root" , "0000" , "myhtmldb");
        return $conn;
    }

    private function buildKey($length) {
        return strtoupper(substr(md5(uniqid(rand(),1)),8,$length));
    }

    private function insertValue($key) {
        $conn = $this->getConn();
        $sql = "INSERT INTO KEYNUMBER VALUES ('$key',FALSE)";
        return mysqli_query($conn,$sql);
    }

    public function getKey($n) {
        $array = array();
        for($i=0;$i<$n;$i++) {
            $key = $this->buildKey(16);
            $array[] = $key;
            $this->insertValue($key);
        }
        return json_encode($array);
    }

    public function getSQLKey() {
        $array = array();
        $sql = "SELECT * FROM KEYNUMBER WHERE USED = FALSE ";
        $result = mysqli_query($this->getConn(),$sql);
        while($row = mysqli_fetch_array($result)) {
            $array[] = $row['keyvalue'];
        }
        return json_encode($array);
    }

    public function checkKey($key) {
        $sql = "SELECT * FROM KEYNUMBER WHERE KEYVALUE = '$key' AND USED = FALSE ";
        $result = mysqli_query($this->getConn(),$sql);
        return mysqli_num_rows($result);
    }
}
