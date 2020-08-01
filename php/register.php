<?php
    //设置头文件
    header('content-type:text/html;charset="utf-8"');

    //拿到传过来的数据
    $userName = $_POST["userName"];
    $password = $_POST["password"];
    $repassword = $_POST["repassword"];

    //建立一个关联数组，用于返回提示信息
    $responseData = array("code"=>0,"msg"=>"");

    //建立数据库
    $link = mysqli_connect("127.0.0.1", "root", "zhangjiuze","JD");

    if(!$userName){
        $responseData["code"] = 1;
        $responseData["msg"] = "用户名不能为空";
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["msg"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }
    if($repassword != $password){
        $responseData["code"] = 3;
        $responseData["msg"] = "两次密码输入不一致";
        echo json_encode($responseData);
        exit;
    }

    if(!$link){
        $responseData["code"] = 4;
        $responseData["msg"] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }

    //设置字符集
    mysqli_set_charset($link,"utf8");

    //查询数据库中有没有这么用户
    $sql = "SELECT * FROM user WHERE userName = '{$userName}'";
    $res = mysqli_query($link,$sql);
    $row = mysqli_fetch_assoc($res);
    if($row){
        $responseData["code"] = 5;
        $responseData["msg"] = "用户名已经存在";
        echo json_encode($responseData);
        exit;
    }

    //密码加密
    $str = md5($password);

    //用户名和密码插入数据库
    $sql2 = "INSERT INTO user (userName,password) VALUES ('{$userName}','{$str}')";
    $res = mysqli_query($link,$sql2);

    if($res){
        $responseData["code"] = 0;
        $responseData["msg"] = "注册成功";
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["code"] = 6;
        $responseData["msg"] = "注册失败";
        echo json_encode($responseData);
        exit;
    }

    //关闭数据库
    mysqli_close($link);

?>