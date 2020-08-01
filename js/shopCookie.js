define(['jquery',"detail_init","jqueryCookie"], 
function($,init) {
    'use strict';
    function shopCookie(){
        // 拿到页面商品信息
        let id = init.getParam().id;
        let right = init.getParam().right;
        //点击添加购物车按钮
        $("#addShopCar").on("click",function(){
            //当前商品数量
            let shopNum = $("#num").html();

            let id = init.getParam().id;
            //判断购物车中有无数据状态
            let first = $.cookie("goods") == null ? true : false;

            if(first){
                let arr = [{id:id,right:right,num:shopNum}];
                $.cookie("goods",JSON.stringify(arr),{expires:7,raw:true})
            }else{
                //判断之前是否添加过
                let cookieArr = JSON.parse($.cookie("goods"));
                //存在与否状态
                let exist = false;
                //遍历cookie，来找对应对商品
                cookieArr.forEach((item)=>{
                    if(item.id == id && item.right == right){
                        console.log(item);
                        //表示存在
                        item.num = parseInt(item.num) + parseInt(shopNum);
                        exist = true;
                    }
                })
                //不存在则新增
                if(!exist){
                    let obj = {id:id,right:right,num:1};
                    cookieArr.push(obj);
                }
                //将处理好对数据放入到cookie中
                $.cookie("goods",JSON.stringify(cookieArr),{expires:7,raw:true});
            }
        })
    }
    return {
        shopCookie:shopCookie
    }
});