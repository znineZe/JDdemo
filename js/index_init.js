define(['jquery',"getData","jqueryCookie"], function($,getData) {
    'use strict';
     //初始化
     function init(){
        //页面刷新初始化加载
        getData.$ajax1("like");
        getData.$ajax2("like");
        let arr = ["like","electric","home","market","fashion","entrance"];
        //商品列表分页处理
        $(".tab-top li").on({
            click: function(){
                $(".tab-top li h3").removeClass("tab-top-active").eq($(this).index()).addClass("tab-top-active");
                let url = arr[$(this).index()];
                getData.$ajax1(url);
            },
            mouseenter:function(){
                $(this).addClass("tab-top-li-active");
            },
            mouseleave:function(){
                $(this).removeClass("tab-top-li-active");
            }
        })
        //今日特价选项卡处理
        $(".commodity-tab li").on({
            mouseenter:function(){
                let url = arr[$(this).index()];
                $(".commodity-tab li").removeClass("commodity-tab-active").eq($(this).index()).addClass("commodity-tab-active");
                getData.$ajax2(url);
            },
            mouseleave:function(){
                let url = arr[$(this).index()];
                getData.$ajax2(url);
            }
        })
        //点击品牌闪购进入商品分类页面
        $(".commodity-tit").on("click",function(){
            location.href = "commodity.html";
        })
    
        //购物车数量
        let cookirArr = JSON.parse($.cookie("goods"));
        let number = 0;
        if(cookirArr){
            cookirArr.forEach((item)=>{
                number += parseInt(item.num);
            })
        }
        $(".hdc-shopCar strong").html(number);
    }
    return {
        init:init,
    }
});