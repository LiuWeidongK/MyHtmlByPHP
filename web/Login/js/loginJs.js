Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'air'
};

$(document).ready(function () {
   $("[value=submit]").click(function () {
       var reg_1 = /^[A-Za-z0-9]{6,8}$/;
       var reg_2 = /^[A-Za-z0-9]{6,18}$/;
       if($("#username").val().trim()==""||$("#password").val().trim()=="")
           Messenger().post({message: '用户名或密码为空', type: 'error', showCloseButton: true});
       else if($("#username").val().match(reg_1) == null)
           Messenger().post({message: '用户名只能包含字母和数字 长度为6-8个字符', type: 'error', showCloseButton: true});
       else if($("#password").val().match(reg_2) == null)
           Messenger().post({message: '密码只能包含字母和数字 长度为6-18个字符', type: 'error', showCloseButton: true});
       else {
           $.ajax({
               type: "POST",
               url: "../../src/loginServ.php",
               data: $("#loginForm").serialize(),
               success: function(data) {
                   if(data=="true")
                       location.href = "../Index/index.php";
                   else if(data=="false") {
                       Messenger().post({message: '用户名或密码错误 登录失败 请重试', type: 'error', showCloseButton: true});
                   }
               }
           });
       }
   });
});