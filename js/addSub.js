define(['jquery',"detail_init","shopCar_init","jqueryCookie"], function($,dInit,sInit) {
    'use strict';
     //点击加减数量发生变化
     function addSub(num,add,sub){
         // 拿到页面商品信息
        // let id = dInit.getParam().id;
        // let right = dInit.getParam().right;

        let shopNum = num && $(num).html();

        //数量大大于1时，减号颜色变化
        if(shopNum > 1){$("#btnSub").css("color","#000")};

        //获取到cookie中到值
        let cookieArr = JSON.parse($.cookie("goods"));

        //处理点击加减
        $(document).on("click",add,function(eve){
            if(num){
                shopNum++;
                $(num).html(shopNum);
                if(shopNum > 1){$("#btnSub").css("color","#000")};
            }else{
                //shopCar页面
                //找到点击的那一块上的父元素上的index属性
                let index = $(eve.target).closest(".shopCar").attr("index");

                //span中值++
                index && cookieArr[index].num++;

                //将变化放到上个兄弟也就是span里面
                $(eve.target).prev().html(cookieArr[index].num)
                
                //将变化结束的cookie放到里面
                $.cookie("goods",JSON.stringify(cookieArr),{expires:7,raw:true});

                //小计数量
                let subtotal = JSON.parse($.cookie("goods"))[index].num;
                
                //单计价格
                let univalent = $(eve.target).closest(".shopCar-num").prev().find("span").html().substr(1);

                //小计总价
                let subtotalPrice = univalent * subtotal;
                $(eve.target).closest(".shopCar-num").next().html(`¥${subtotalPrice}`)

            }
        })
        $(document).on("click",sub,function(eve){
            if(num){
                //details页面 大于1时，可以进行减减
                shopNum > 1 && shopNum--;
                shopNum == 1 && $("#btnSub").css("color","#ccc");
                $(num).html(shopNum);
            }else{
                //shopCar页面
                //找到点击的那一块上的父元素上的index属性
                let index = $(eve.target).closest(".shopCar").attr("index");

                //span中值++
                index && cookieArr[index].num--;

                // 进行减商品限定
                if(cookieArr[index].num < 1)cookieArr[index].num =1;

                //将变化放到下个兄弟也就是span里面
                $(eve.target).next().html(cookieArr[index].num)

                //将变化结束的cookie放到里面
                $.cookie("goods",JSON.stringify(cookieArr),{expires:7,raw:true});

                //小计数量
                let subtotal = JSON.parse($.cookie("goods"))[index].num;
                
                //单计价格
                let univalent = $(eve.target).closest(".shopCar-num").prev().find("span").html().substr(1);

                //小计总价
                let subtotalPrice = univalent * subtotal;
                $(eve.target).closest(".shopCar-num").next().html(`¥${subtotalPrice}`)
            }
        })
     }
     return {
         addSub:addSub
     }
});