console.log("加载成功");
/*
    对要引入的文件进行路径配置
*/
require.config({
    paths:{
        //后续可以直接用配置好的名字
        jquery:"jquery.min",
        jqueryCookie:"jquery.cookie",
        index_init:"index_init",//初始化
        banner:"banner",//banner图
        getData:"getData"//获取数据
    },
    shim:{
        //设置依赖关系
        jqueryCookie:["jquery"]
    }
}); 
require(["banner","index_init"],function(banner,init){
    //轮播图
    banner.$banner({
        oUl:".banner-bg-img",
        aLis:".banner-bg ol li",
        aBtns:".banner-bg span",
        oBanner:".banner-bg",
        imgWidth:"590"
    });
    banner.$banner({
        oUl:".banner-sml-box",
        aLis:".banner-sml-case ol li",
        aBtns:".banner-sml-case span",
        oBanner:".banner-sml-case",
        imgWidth:"190"
    });
    //首页初始化
    init.init();
});