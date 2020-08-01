define(['jquery'], function($) {
    function $banner(){
        let a1 = new Banner(...arguments)
    }
    class Banner{
        constructor({oUl,aLis,aBtns,oBanner,imgWidth}){
            this.oUl = $(oUl);
            this.aLis = $(aLis);
            this.aBtns = $(aBtns);
            this.oBanner = $(oBanner)
            this.imgWidth = imgWidth;
            
            this.iNow = 1;
            this.timer = null;
    
            this.addEvent();
            this.auto();
        }
        addEvent(){
            var that = this;
            //四个按钮添加点击
            this.aLis.on("click",function(){
                that.iNow = $(this).index()+1;
                that.tab();
            })
            //右添加点击
            this.aBtns.eq(0).on("click",()=>{
                this.iNow++;
                this.tab();
            })
            //左添加点击
            this.aBtns.eq(1).on("click",()=>{
                this.iNow--;
                this.tab();
            })
            //添加自动
            this.oBanner.on("mouseleave",()=>{
                this.auto();
            })
            this.oBanner.on("mouseenter",()=>{
                clearInterval(this.timer);
            })
        }
        auto(){
            this.timer = setInterval(()=>{
                this.iNow++;
                this.tab();
            },2000)
        }
        //轮播动画
        tab(){
            this.aLis.removeClass("active")
            .eq(this.iNow-1).addClass("active");
            if(this.iNow == this.aLis.length+1){
                this.aLis.eq(0).addClass("active")
            }
            //banner运动动画
            this.oUl.stop(true).animate({
                left:this.iNow * -this.imgWidth
            },1000,()=>{
                if(this.iNow == this.aLis.length+1){
                    this.oUl.css("left",-this.imgWidth);
                    this.iNow = 1;
                }
                if(this.iNow == 0){
                    this.oUl.css("left",this.aLis.length * -this.imgWidth);
                    this.iNow = this.aLis.length;
                }
            })
        }
    }
    return {
        $banner:$banner,
    };
});
