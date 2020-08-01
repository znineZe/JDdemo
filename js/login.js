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

    
    $("#userName").on("blur",function(){
        if($(this).val().length < 6 || $(this).val().length > 18){
            alert("! 长度应为6～18个字符");
        }else if(!/[a-zA-Z]/.test($(this).val()[0])){
            alert("! 用户名需以字母开头");
        }
    })
    $("#password").on("blur",function(){
        if($(this).val().length < 6 || $(this).val().length > 18){
            alert("! 长度应为6～18个字符");
        }
    })




     //点击登录进行用户登录
     $("#login").on("click",function(){
        $.ajax({
            type:"post",
            url:"./php/login.php",
            data:{
                userName:$("#userName").val(),
                password:$("#password").val(),
            },
            success:function(result){
                let obj = JSON.parse(result);
                if(obj.code == 0){
                    alert(obj.message + "，随后进入首页");
                    setTimeout(()=>{
                        location.assign("index.html")
                    },1000)
                }else if(obj.code == 1){
                    alert(obj.message);
                }else if(obj.code == 2){
                    alert(obj.message);
                }else if(obj.code == 4){
                    alert(obj.message);
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    })
})