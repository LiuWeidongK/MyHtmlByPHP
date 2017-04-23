<?php

/**
 * Created by PhpStorm.
 * User: Misaya
 * Date: 2017/4/22
 * Time: 16:29
 */
class Message
{
    const APP_KEY = '78b4b0ee37afa006e5575fc149771f56';
    const APP_SECRET = '2861096ae4a3';
    const TEMPLATE_ID = '3064244';

    public static function SendMsg($mobile,$params){
        $appKey = self::APP_KEY;
        $appSecret = self::APP_SECRET;
        $nonce = '4tgggergigwow323t23t';
        $curTime = time();
        $checkSum = sha1($appSecret . $nonce . $curTime);
        $data  = array(
            'templateid'=> self::TEMPLATE_ID,
            'mobiles'=> $mobile,
            'params'=> $params
        );
        $data = http_build_query($data);
        $opts = array (
            'http' => array(
                'method' => 'POST',
                'header' => array(
                    'Content-Type:application/x-www-form-urlencoded;charset=utf-8',
                    "AppKey:$appKey",
                    "Nonce:$nonce",
                    "CurTime:$curTime",
                    "CheckSum:$checkSum"
                ),
                'content' =>  $data
            ),
        );
        $context = stream_context_create($opts);
        $html = file_get_contents("https://api.netease.im/sms/sendtemplate.action", false, $context);
        return json_decode($html);
    }

    public static function CheckMsg($sendid){
        $appKey = self::APP_KEY;
        $appSecret = self::APP_SECRET;
        $nonce = '4tgggergigwow323t23t';
        $curTime = time();
        $checkSum = sha1($appSecret . $nonce . $curTime);
        $data  = array(
            'sendid'=> $sendid
        );
        $data = http_build_query($data);
        $opts = array (
            'http' => array(
                'method' => 'POST',
                'header' => array(
                    'Content-Type:application/x-www-form-urlencoded;charset=utf-8',
                    "AppKey:$appKey",
                    "Nonce:$nonce",
                    "CurTime:$curTime",
                    "CheckSum:$checkSum"
                ),
                'content' =>  $data
            ),
        );
        $context = stream_context_create($opts);
        $html = file_get_contents("https://api.netease.im/sms/querystatus.action", false, $context);
        return json_decode($html);
    }
}