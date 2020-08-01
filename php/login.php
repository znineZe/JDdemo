<?php
    //设置头文件
    header('content-type:text/html;charset="utf-8"');

    //拿到传过来的数据
    $userName = $_POST["userName"];
	$password = $_POST["password"];
	
	//建立一个关联数组，用于返回提示信息
    $responseData = array("code"=>0,"msg"=>"");

    //数据验证
    if(!$userName){
		$responseData['code'] = 1;
		$responseData['message'] = "用户名不能为空";
		echo json_encode($responseData);
		exit;
    }
    if(!$password){
		$responseData['code'] = 2;
		$responseData['message'] = "密码不能为空";
		echo json_encode($responseData);
		exit;
	}

    //建立数据库
    $link = mysqli_connect("127.0.0.1", "root", "zhangjiuze","JD");
    if(!$link){
        $responseData["code"] = 3;
        $responseData["msg"] = "服务器忙";
        echo json_encode($responseData);
        exit;
    }

    //设置字符集
    mysqli_set_charset($link,"utf8");

    $str = md5($password);


    //准备sql语句进行登录
	$sql = "SELECT * FROM user WHERE username='{$userName}' AND password='{$str}'";


    $res = mysqli_query($link, $sql);
	//[mysql result]
	//取出第一行数据，判断数据是否存在，如果存在返回关联数组，否则返回false
	$row = mysqli_fetch_assoc($res);

	if(!$row){
		$responseData['code'] = 4;
		$responseData['message'] = "用户名或密码错误";
		echo json_encode($responseData);
		exit;
	}else{
		$responseData['message'] = "登录成功";
		$responseData["username"] = $row['username'];
		echo json_encode($responseData);
	}


	mysqli_close($link);

?>