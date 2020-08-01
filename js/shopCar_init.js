define(['jquery',"addSub","jqueryCookie"], function($,addSub) {
    'use strict';
    function init(){
        // 添加删除
        $(document).on("click",".shopCar-delate",function(eve){
            //页面上删除
            let shop = $(eve.target).closest(".shopCar").remove().attr('shop');
            let shopArr = shop.split("&");
            //获取cookie
            let cookieArr = JSON.parse($.cookie("goods"));

            let newCookieArr = [];

            //过滤不等的index属性
            cookieArr.forEach((item)=>{
                if((item.id+item.right) != (shopArr[0]+shopArr[1])){
                    newCookieArr.push(item);
                }
            })
            //重新插入cookie
            newCookieArr ? $.cookie("goods",JSON.stringify(newCookieArr),{expires:7,raw:true}) : $.cookie("goods",null); 
        })
        //添加点击每件商品上的复选框复选框
        let obj = {number:0,price:0}
        $(document).on("click",".patch",function(){
            if ($(this).is(":checked")== true) {
                //选中触发事件
                $(this).next().css("background","#fff4e8");
                addSub.addSub(null,"#shopCar-add","#shopCar-sub");
                //拿到单价
                let price = parseInt($(this).next().find(".shopCar-subtotal").html().substr(1));
                console.log(price)
                //拿到数量
                let num = parseInt($(this).next().find(".shopCar-num span").html());
                //计算总价和数量
                obj.price += price;
                obj.number += num;
                $(".shop-foot .foot-num span").html(`¥${obj.number}`);
                $(".shop-foot .foot-price span").html(`¥${obj.price}`);

             } else {
                //取消选中触发事件
                $(this).next().css("background","none");
                //拿到单价
                let price = parseInt($(this).next().find(".shopCar-subtotal").html().substr(1));
                //拿到数量
                let num = parseInt($(this).next().find(".shopCar-num span").html());
                //计算总价和数量
                obj.price -= price;
                obj.number -= num;
                $(".shop-foot .foot-num span").html(obj.number);
                $(".shop-foot .foot-price span").html(obj.price);
             }
        })
        //添加全选复选框
        $(".check").on("click",function(){
            let cookieArr = JSON.parse($.cookie("goods"));
            if($(this).is(":checked") == true){
                $("input[type='checkbox']").attr("checked","true")
                 
                //计算总数
                let number = 0;
                let price = 0;
                cookieArr.forEach((item,index)=>{
                    number += item.num;
                    price += parseInt($(".shopCar").eq(index).find(".shopCar-subtotal").html().substr(1));
                }) 
                //计算价格和总数
                $(".shop-foot .foot-price span").html(`￥${price}`);
                $(".shop-foot .foot-num span").html(number);    
                // 
                $(".patch").next().css("background","#fff4e8");
            }else{
                $("input[type='checkbox']").removeAttr("checked")
                //总数归0
                $(".shop-foot .foot-num span").html(0);    
                //总价归0
                $(".shop-foot .foot-price span").html(0);
                $(".patch").next().css("background","none");

            }
        })

        ////添加清楚购物车
        $(".foot-clear").on("click",function(){
            $.cookie("goods",null);
            $(".shopCar").remove();
        })

    }
    function getDataShopCar(){
        let cookieArr = JSON.parse($.cookie("goods"));
        $.ajax({
            url: "./data/details.json",
            dataType: "json",
            success: function (arr) {
                // console.log(arr);
                if(cookieArr){
                    for (let i = 0; i < cookieArr.length; i++) {
                        // console.log(cookieArr[i])
                        for(var j = 0; j < arr.length; j++){
                            // console.log(arr[j])
                            //判断cookie中id组和数据中id组相等进行下一步
                            if(cookieArr[i].id == arr[j].id){
                                //小计数量
                                let subtotal = cookieArr[i].num;
                                //单价
                                let univalent = arr[j].right[cookieArr[i].right].priceLeft;
                                //总价
                                let subtotalPrice = univalent * subtotal;
                                $(`<div class="shopCar" index=${i} shop="${j}&${cookieArr[i].right}">
                                        <h3 class="discount">
                                            京东自营啊自营！
                                        </h3>
                                        <div class="shopCar-list">
                                            <ul class="shopCar-top">
                                                <li>跨自营/店铺满折</li>
                                                <li>
                                                    活动商品购满2件，即可享受满减>
                                                </li>
                                                <li>去凑单</li>
                                            </ul>
                                            <div class="shopCar-bottom">
                                                <input type="checkbox" class="patch">
                                                <div class="shopCar-right">
                                                    <img src="${arr[j].right[cookieArr[i].right].img}" alt="">
                                                    <p>
                                                        <em>${arr[j].right[cookieArr[i].right].describe}</em>
                                                        <i>选服务</i>
                                                    </p>
                                                    <div class="shopCar-price">
                                                        <span>¥${arr[j].right[cookieArr[i].right].priceLeft}</span>
                                                        <span>促销</span>
                                                    </div>
                                                    <div class="shopCar-num">
                                                        <i id="shopCar-sub">-</i>
                                                        <span>${cookieArr[i].num}</span>
                                                        <i id="shopCar-add">+</i>
                                                    </div>
                                                    <div class="shopCar-subtotal">¥${subtotalPrice}</div>
                                                    <di class="shopCar-delate">删除</di>
                                                </div>
                                            </div>
                                            <div class="shopCar-hint">
                                                【闪购】2020-07-31 00:00 恢复原价
                                            </div>
                                        </div>
                                    </div>`).appendTo(".shopCar-con");
                            }
                        }
                    }
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    return {
        init:init,
        getDataShopCar:getDataShopCar
    }
});