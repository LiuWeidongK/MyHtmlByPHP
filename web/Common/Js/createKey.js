/**
 * Created by Administrator on 2017/2/18.
 * 生成验证码的Js
 */
$(document).ready(function () {
    $("#submitToCreate").click(function () {
        $.post('../../../src/createKeyServ.php', {
            creatNum : $("#creatNum").val(),
            sign : "1"
        }, function(data) {
            var jsonObj = eval( "(" + data + ")" );
            var content ="";
            $.each(jsonObj, function (index,obj) {
                content += "<li class=\"list-group-item\">" + obj + "</li>";
            });
            $("#ulCreate").html(content);
        })
    });

    $("#fresh").click(function () {
        $.post('../../../src/createKeyServ.php', {
            sign : "2"
        }, function(data) {
            var jsonObj = eval( "(" + data + ")" );
            var content ="";
            $.each(jsonObj, function (index,obj) {
                content += "<li class=\"list-group-item\">" + obj + "</li>";
            });
            $("#ulSelect").html(content);
        })
    });

    $("#submitToCheck").click(function () {
        $.post('../../../src/createKeyServ.php', {
            keyNum : $("#keyNum").val(),
            sign : "3"
        }, function(data) {
            if(data=="true") {
                var content = "";
                content += "<span class=\"glyphicon glyphicon-ok form-control-feedback\" aria-hidden=\"true\"></span>";
                content += "<span id=\"inputSuccess3Status\" class=\"sr-only\">(success)</span>";
                $("#change").addClass("has-success has-feedback");
                $("#ico").html(content);
            }
            else if(data=="false") {
                var content = "";
                content += "<span class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=\"true\"></span>";
                content += "<span id=\"inputError2Status\" class=\"sr-only\">(error)</span>";
                $("#change").addClass("has-error has-feedback");
                $("#ico").html(content);
            }
        })
    });
});