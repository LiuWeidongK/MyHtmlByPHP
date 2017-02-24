<?php
include ('connMySQL.php');
class createKeyClass
{
    private function getConn() {
        $class = new connMySQL();
        $conn = $class->getConn();
        return $conn;
    }

    private function buildKey($length) {
        return strtoupper(substr(md5(uniqid(rand(),1)),8,$length));
    }

    private function insertValue($key) {
        $sql = "INSERT INTO keynumber VALUES ('$key',FALSE)";
        return mysqli_query($this->getConn(),$sql);
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
        $conn = $this->getConn();
        $sql = "SELECT * FROM keynumber WHERE used = FALSE ";
        $result = mysqli_query($conn,$sql);
        while($row = mysqli_fetch_array($result)) {
            $array[] = $row['keyvalue'];
        }
        return json_encode($array);
    }

    public function checkKey($key) {
        $sql = "SELECT * FROM keynumber WHERE keyvalue = '$key' AND used = FALSE ";
        $result = mysqli_query($this->getConn(),$sql);
        return mysqli_num_rows($result);
    }
}
