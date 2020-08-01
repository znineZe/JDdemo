define(['jquery'], function(require, factory) {
    'use strict';
    //放大镜函数
    function magnifying(eve){
        //设置遮罩层的left
        let l = eve.pageX -$(".detail-box").offset().left - $(".detail-box span").outerWidth() / 2;
        if(l<0)l=0;
        if(l >= $(".detail-box").outerWidth() -$(".detail-box span").outerWidth()){
            l = $(".detail-box").outerWidth() -$(".detail-box span").outerWidth();
        }
        $(".detail-box span").css("left",l);
        //设置遮罩层的left
        let t = eve.pageY- $(".detail-box").offset().top - $(".detail-box span").outerHeight()/2;
        if(t<0)t=0;
        if(t >= $(".detail-box").outerHeight() -$(".detail-box span").outerHeight()){
            t = $(".detail-box").outerHeight() -$(".detail-box span").outerHeight();
        }
        $(".detail-box span").css("top",t);
        //设置大图的运动
        $(".detail-bigbox img").css({
            "left":-l * 2,
            "top":-t * 2
        })
    }
    return {
        magnifying:magnifying
    }
});