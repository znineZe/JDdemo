$(function(){

    window.alert = alert;

function alert(data) {

var a = document.createElement("div"),

p = document.createElement("p"),

btn = document.createElement("div"),

textNode = document.createTextNode(data ? data : ""),

btnText = document.createTextNode("确定");

// 控制样式

css(a, {

"position" : "fixed",

"left" : "0",

"right" : "0",

"top" : "40%",

"width" : "300px",

"margin" : "0 auto",

"padding" : "10px",

"color" : "#FF5050",

"background-color" : "#fff",

"border" : "1px solid #FF5050",

"border-radius" : "4px",

"font-size" : "14px",

"text-align" : "center",

"z-index" : "10"

});

css(btn, {

"width" : "80px",

"margin" : "0 auto",

"margin-top" : "20px",

"line-height" : "24px",

"color" : "#fff",

"background" : "#FF5050",

"border-radius" : "4px",

"cursor" : "pointer"

});

// 内部结构套入

p.appendChild(textNode);

btn.appendChild(btnText);

a.appendChild(p);

a.appendChild(btn);

// 整体显示到页面内

document.getElementsByTagName("body")[0].appendChild(a);

// 确定绑定点击事件删除标签

btn.onclick = function() {

a.parentNode.removeChild(a);

};

}

function css(targetObj, cssObj) {

var str = targetObj.getAttribute("style") ? targetObj.getAttribute("style") : "";

for(var i in cssObj) {

str += i + ":" + cssObj[i] + ";";

}

targetObj.style.cssText = str;

}




$("#userName").on("input",function(){
    if($(this).val().length < 6 || $(this).val().length > 18){
        $(".login-prompt").eq(0).html("! 长度应为6～18个字符").css({
            "display":"block",
            "background":"rgba(238, 14, 14, 0.781)",
            "padding-left":"5px"
        })
    }else if(!/[a-zA-Z]/.test($(this).val()[0])){
        $(".login-prompt").eq(0).html("! 用户名需以字母开头").css({
            "display":"block",
            "background":"rgba(238, 14, 14, 0.781)",
            "padding-left":"5px"
        })
    }else{
        $(".login-prompt").eq(0).html("√ 恭喜，该用户名可以登录").css({
            "display":"block",
            "background":"rgba(54, 245, 48, 0.787)",
            "padding-left":"5px"
        })
    }
})
$("#password").on("input",function(){
    if($(this).val().length < 6 || $(this).val().length > 18){
        $(".login-prompt").eq(1).html("! 长度应为6～18个字符").css({
            "display":"block",
            "background":"rgba(238, 14, 14, 0.781)",
            "padding-left":"5px"
        })
    }else if(!/[a-zA-Z]/.test($(this).val()[0])){
        $(".login-prompt").eq(1).html("! 用户名需以字母开头").css({
            "display":"block",
            "background":"rgba(238, 14, 14, 0.781)",
            "padding-left":"5px"
        })
    }else{
        $(".login-prompt").eq(1).html("√ 恭喜，该密码可以使用").css({
            "display":"block",
            "background":"rgba(54, 245, 48, 0.787)",
            "padding-left":"5px"
        })
    }
})
$("#repassword").on("input",function(){
    if($(this).val() != $("#password").val()){
        $(".login-prompt").eq(2).html("与上面密码不符").css({
            "display":"block",
            "background":"rgba(238, 14, 14, 0.781)",
            "padding-left":"5px"
        })
    }else{
        $(".login-prompt").eq(2).html("！可以注册啦").css({
            "display":"block",
            "background":"rgba(54, 245, 48, 0.787)",
            "padding-left":"5px"
        })
    }
})




    //点击注册进行用户注册
    $("#register").on("click",function(){
        $.ajax({
            type:"post",
            url:"./php/register.php",
            data:{
                userName:$("#userName").val(),
                password:$("#password").val(),
                repassword:$("#repassword").val(),
            },
            success:function(result){
                let obj = JSON.parse(result);
                console.log(obj)
                if(obj.code == 0){
                    alert(obj.msg + "，随后进入登录页面");
                    setTimeout(()=>{
                        location.assign("login.html")
                    },1000)
                }
                obj.code == 1 && alert(obj.msg);
                obj.code == 2 && alert(obj.msg);
                obj.code == 3 && alert(obj.msg);
                obj.code == 4 && alert(obj.msg);
                obj.code == 5 && alert(obj.msg);
            },
            error:function(msg){
                console.log(msg);
            }
        })
    })

})