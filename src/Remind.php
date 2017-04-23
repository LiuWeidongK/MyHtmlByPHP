<?php

/**
 * Created by PhpStorm.
 * User: Misaya
 * Date: 2017/4/23
 * Time: 12:36
 */
include_once 'connMySQL.php';
include_once 'Message.php';

class Remind
{
    public static function send($uNo,$fNo) {
        $arr = array();
        $sql = "SELECT * FROM borrow,facinfo,personal WHERE borrow.username = personal.username AND borrow.FacNo = facinfo.FacNo AND personal.username = '$uNo' AND facinfo.FacNo = '$fNo'";
        $result = mysqli_query(connMySQL::getConn(),$sql);
        if($row = mysqli_fetch_array($result)) {
            $arr['phone'] = $row['telephone'];
            $arr['name'] = $row['name'];
            $arr['factory'] = $row['FacName'];
        }
        $mobile = json_encode(array($arr['phone']));
        $params = json_encode(array($arr['name'],$arr['factory']));
        $sendJson = Message::SendMsg($mobile,$params);
        if($sendJson->code==200) {
            $resultJson = Message::CheckMsg($sendJson->obj);
            if($resultJson->code==200) {
                $r = $resultJson->obj;
                switch ($r[0]->status) {
                    case 0:
                        //未发送
                        return '300';
                    case 1:
                        //发送成功
                        return '301';
                    case 2:
                        //发送失败
                        return '302';
                    case 3:
                        //反垃圾
                        return '303';
                }
            } else {    //检查失败
                return '200';
            }
        } else {    //发送失败
            //返回状态码 + 状态信息
            return '100';
        }
        return '100';
    }
}