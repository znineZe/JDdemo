define(['jquery',"magnifying"], function($,magnifying) {
    'use strict';
    //商品细节页初始化
    function init(){
        //获取传过来对值
        let param = getParam();
        //进行商品信息初始化
        $.ajax({
            url: "./data/details.json",
            dataType: "json",
            success: function (arr) {
                arr.forEach((item)=>{
                    //通过获取到id进行初始化
                    if(param.id == item.id){
                        let data = item.right[param.right];
                        $(".detail-smlbox img").attr("src",data.img);
                        $(".detail-bigbox img").attr("src",data.bigImg);
                        $(".p-tit-top").html(data.describe);
                        $(".p-price li p").eq(1).html("¥" + data.priceLeft)
                    }
                })
            },
            error:function(msg){
                console.log(msg);
            }
        })

        // 商品放大初始化
        $(".detail-smlbox").on({
            mouseenter:function(){
                $(".detail-box span").css("display","block");
                $(this).on("mousemove",function(eve){
                    //大图出现
                    $(".detail-bigbox").css("display","block")
                    //执行放大镜函数
                    magnifying.magnifying(eve);
                })
            },
            mouseleave:function(){
                $(".detail-box span").css("display","none");
                $(".detail-bigbox").css("display","none")
            }
        })
        // 点击购物车进行询问
        $("#addShopCar").on("click",function(){
            $("#popUpBox").css("display","block").on("click","em",function(){
                $(this).closest("#popUpBox").css("display", 'none');
            })
        })
    }
    //处理另一个页面传过来对值
    function getParam(){
        //商品信息加载
        let addStr = location.search.slice(1);
        //按&裁开
        let arr = addStr.split("&");
        let obj = {};
        //遍历放到对象当中
        arr.forEach((item,index)=>{
            obj[item.split("=")[0]] = item.split("=")[1]; 
        })
        return obj;
    }
    return {
        init:init,   
        getParam:getParam
    }
});