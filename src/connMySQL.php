<?php
    class connMySQL
    {
        function getConn() {
            $conn = new mysqli("bdm264098108.my3w.com" , "bdm264098108" , "liu123456" , "bdm264098108_db");
            return $conn;
        }
    }