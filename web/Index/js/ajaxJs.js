/**
 * Created by Administrator on 2017/2/3.
 * index.jsp页面所有和服务器交互的js代码
 */
var facIdd;     //全局变量 设备编号
var isManagers = 0;  //标记管理员:1和普通用户:0

//初始化弹窗样式以及位置
Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
    theme: 'air'
};

//退出登录 页面重定向到login.jsp
$(document).ready(function () {
    $("#realOut").click(function () {
        location.href = "../Login/login.php";
    });
});

//置空
function checkNull(str) {
    if(typeof (str) == "undefined")
        return "";
    else return str;
}

//显示个人信息补全提示
$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "../../src/checkPersonalServ.php",
        success: function(data) {
            if(data=="false"){
                $("#tips").text("1");
            }
        }
    });
});

//管理员与普通用户
function isManager() {
    $.ajax({
        type: "POST",
        url: "../../src/userTypeServ.php",
        success: function(data) {
            if(data=="manager") {                  //管理员
                $("#LiManage").addClass("hide");
                $("#userType").text("管理员");
                $("[name=borrowBtn]").addClass("disabled");
                isManagers = 1;
            } else if(data=="ordinary") {        //普通用户
                $("#LiFacManage").addClass("disabled");
                $("#userType").text("普通用户");
                $("#remindAll").addClass("hide");
                isManagers = 0;
            }
        }
    });
}

//刷新Div
$(document).ready(function () {
    refresh_1();
    refresh_4();
    $("#refreshBtn1").click(function () {
        refresh_1();
    });
    $("#refreshBtn2").click(function () {
        refresh_2();
    });
    $("#refreshBtn3").click(function () {
        refresh_3();
    });
});

//修改密码ajax
$(document).ready(function () {
    $("#updatePassForm").submit(function(ev){ev.preventDefault();});
    $("#uPass").click(function () {
        if($("#newPass").val()==$("#newPassAgain").val()) {
            var bootstrapValidator = $("#updatePassForm").data('bootstrapValidator');
            bootstrapValidator.validate();
            if(bootstrapValidator.isValid()) {
                $.ajax({
                    type: "POST",
                    url: "../../src/updatePassServ.php",
                    data: $("#updatePassForm").serialize(),
                    success: function(data) {
                        if(data=="success"){
                            Messenger().post({message: '修改成功', type: 'success', showCloseButton: true});
                            $("#updatePass").modal('hide');
                        }
                        else if(data=="updateFail")
                            Messenger().post({message: '修改失败 请重试', type: 'error', showCloseButton: true});
                        else if(data=="checkFail")
                            Messenger().post({message: '原密码输入错误 请重试', type: 'error', showCloseButton: true});
                        else
                            Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                    }
                });
            }
            else {
                Messenger().post({message: '表单格式错误 请正确输入', type: 'error', showCloseButton: true});
                //return ;
            }
        } else {
            Messenger().post({message: '两次密码输入不符 请重试', type: 'error', showCloseButton: true});
        }
    });
});


//借用设备ajax
$(document).ready(function () {
    $("#borrowForm").submit(function(ev){ev.preventDefault();});
    $("#submitBorrow").on("click", function(){
        var bootstrapValidator = $("#borrowForm").data('bootstrapValidator');
        bootstrapValidator.validate();
        if(bootstrapValidator.isValid()) {
            $.ajax({
                type: "POST",
                url: "../../src/borrowServ.php",
                data: $("#borrowForm").serialize(),
                success: function(data) {
                    if(data=="success"){
                        Messenger().post({message: '提交成功', type: 'success', showCloseButton: true});
                        $("#borrowModal").modal('hide');
                        refresh_1();
                    }
                    else if(data=="fail")
                        Messenger().post({message: '提交失败 不可重复借用', type: 'error', showCloseButton: true});
                    else
                        Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            });
        }
        else {
            Messenger().post({message: '表单格式错误 请正确输入', type: 'error', showCloseButton: true});
        }
    });
});

//添加设备ajax
$(document).ready(function () {
    $("#addFacForm").submit(function(ev){ev.preventDefault();});
    $("#submitAdd").on("click", function(){
        var bootstrapValidator = $("#addFacForm").data('bootstrapValidator');
        bootstrapValidator.validate();
        if(bootstrapValidator.isValid()) {
            $.ajax({
                type: "POST",
                url: "../../src/addFacServ.php",
                data: $("#addFacForm").serialize(),
                success: function(data) {
                    if(data=="success"){
                        Messenger().post({message: '添加成功', type: 'success', showCloseButton: true});
                        $("#addModal").modal('hide');
                        refresh_2();
                    }
                    else if(data=="insertFail")
                        Messenger().post({message: '添加失败 请重试', type: 'error', showCloseButton: true});
                    else if(data=="repeatFail")
                        Messenger().post({message: '添加失败 设备重复 请重试', type: 'error', showCloseButton: true});
                    else
                        Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            });
        }
        else {
            Messenger().post({message: '表单格式错误 请正确输入', type: 'error', showCloseButton: true});
        }
    });
});

//个人信息ajax
$(document).ready(function () {
    $("#personalForm").submit(function(ev){ev.preventDefault();});
    $("#personalBtn").on("click", function(){
        var bootstrapValidator = $("#personalForm").data('bootstrapValidator');
        bootstrapValidator.validate();
        if(bootstrapValidator.isValid()) {
            $.ajax({
                type: "POST",
                url: "../../src/personalServ.php",
                data: $("#personalForm").serialize(),
                success: function(data) {
                    if(data=="success") {
                        Messenger().post({message: '提交成功', type: 'success', showCloseButton: true});
                        $("#tips").text("");
                        $("#personalForm").bootstrapValidator('resetForm',true);
                        refresh_4();
                    }
                    else if(data=="fail")
                        Messenger().post({message: '提交失败 请重试', type: 'error', showCloseButton: true});
                    else
                        Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            });
        }
        else {
            Messenger().post({message: '表单格式错误 请正确输入', type: 'error', showCloseButton: true});
        }
    });
});

//修改设备ajax
$(document).ready(function () {
    $("#updateFacForm").submit(function(ev){ev.preventDefault();});
    $("#submitUpdateFac").on("click", function(){
        var bootstrapValidator = $("#updateFacForm").data('bootstrapValidator');
        bootstrapValidator.validate();
        if(bootstrapValidator.isValid()) {
            $.ajax({
                type: "POST",
                url: "../../src/updateFacServ.php",
                data: $("#updateFacForm").serialize(),
                success: function(data) {
                    if(data=="success"){
                        Messenger().post({message: '修改成功', type: 'success', showCloseButton: true});
                        $("#updateModal").modal('hide');
                        refresh_2();
                    }
                    else if(data=="fail")
                        Messenger().post({message: '修改失败 请重试', type: 'error', showCloseButton: true});
                    else
                        Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            });
        }
        else {
            Messenger().post({message: '表单格式错误 请正确输入', type: 'error', showCloseButton: true});
            //return ;
        }
    });
});

//成为管理员表单验证
$(document).ready(function () {
    $("#toManageForm").submit(function(ev){ev.preventDefault();});
    $("#toManageSubmit").on("click", function(){
        var bootstrapValidator = $("#toManageForm").data('bootstrapValidator');
        bootstrapValidator.validate();
        if(bootstrapValidator.isValid()) {
            $.ajax({
                type: "POST",
                url: "../../src/keyNumberServ.php",
                data: $("#toManageForm").serialize(),
                success: function(data) {
                    if(data=="success"){
                        $("#toManageModal").modal('hide');
                        window.location.reload();
                    }
                    else if(data=="fail")
                        Messenger().post({message: '操作失败 请检查邀请码是否正确', type: 'error', showCloseButton: true});
                    else
                        Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            });
        }
        else {
            Messenger().post({message: '表单格式错误 请正确输入', type: 'error', showCloseButton: true});
        }
    });
});

//删除设备ajax
$(document).ready(function () {
    $("#sureDelete").click(function () {
        $.ajax({
            type: "POST",
            url: "../../src/deleteServ.php",
            data: {facid:facIdd},
            success: function(data) {
                if(data=="success"){
                    Messenger().post({message: '删除成功', type: 'success', showCloseButton: true});
                    $("#deleteModal").modal('hide');
                    refresh_2();
                }
                else if(data=="fail")
                    Messenger().post({message: '删除失败 请重试', type: 'error', showCloseButton: true});
                else
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
            }
        });
    });
});

//批量删除
$(document).ready(function () {
    $("#deleteAll").click(function () {
        var checkedNum = $("input[name='followBox']:checked").length;
        if (checkedNum == 0) {
            Messenger().post({message: '请至少选择一条信息', type: 'error', showCloseButton: true});
        } else {
            $("#deleteAlert").text("删除信息后会导致相应的借用记录也随之删除,数据不可恢复,你确定要删除这" + checkedNum + "条信息么?");
            $("#deleteAllModal").modal('show');
            var checkedList = [];
            $("input[name='followBox']:checked").each(function () {
                checkedList.push($(this).parents("tr").find("td").eq(2).text().trim());
            });

            $("#sureDeleteAll").click(function () {
                $.ajax({
                    type: "POST",
                    url: "../../src/deleteAllServ.php",
                    data: {facList: checkedList},
                    success: function (data) {
                        if (data == "success") {
                            Messenger().post({message: "删除成功 已删除" + checkedNum + "条数据", type: 'success', showCloseButton: true});
                            $("#deleteAllModal").modal('hide');
                            refresh_2();
                        }
                        else if (data == "fail")
                            Messenger().post({message: '删除失败 请重试', type: 'error', showCloseButton: true});
                        else
                            Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                    }
                });
            });
        }
    });
});

//判断个人信息
function checkInfo() {
    $("[name='borrowBtn']").click(function () {
        $.ajax({
            type: "POST",
            url: "../../src/checkPersonalServ.php",
            success: function(data) {
                if(data=="true"){
                    $("#borrowModal").modal('show');
                }
                else if(data=="false") {
                    Messenger().post({message: '请先补全个人信息 之后才能执行此操作', type: 'error', showCloseButton: true});
                }
                else {
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            }
        });
    });
    $("#toManage").click(function () {
        $.ajax({
            type: "POST",
            url: "../../src/checkPersonalServ.php",
            success: function(data) {
                if(data=="true"){
                    $("#toManageModal").modal('show');
                }
                else if(data=="false") {
                    Messenger().post({message: '请先补全个人信息 之后才能执行此操作', type: 'error', showCloseButton: true});
                }
                else {
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            }
        });
    });
}

//获取设备编号
function deleteFac() {
    $("[name='deleteBtn']").click(function () {
        facIdd = $(this).parents("tr").find("td").eq(2).text().trim();  //删除设备编号
    });
}

function firstTable() {
   $("[name='borrowBtn']").click(function () {
       var facName = $(this).parents("tr").find("td").eq(2).text().trim();  //设备名称
       var facId = $(this).parents("tr").find("td").eq(1).text().trim();    //设备编号
       $("#borrowFacIn").val(facName);
       $("#borrowFacID").val(facId);
   });
}

function secondTable() {
   $("[name='updateBtn']") .click(function () {
       $("#upinputLabNo").val($(this).parents("tr").find("td").eq(1).text().trim());
       $("#upinputFacNo").val($(this).parents("tr").find("td").eq(2).text().trim());
       $("#upinputFacName").val($(this).parents("tr").find("td").eq(3).text().trim());
       $("#upinputFacMod").val($(this).parents("tr").find("td").eq(4).text().trim());
       $("#upStock").val($(this).parents("tr").find("td").eq(5).text().trim());
   });
}

//刷新table
function refresh_1() {
    $.post('../../src/refreshTableJson.php', {
        No : "1"
    }, function(data) {
        var jsonObj = eval( "(" + data + ")" );
        var content ="";
        $.each(jsonObj, function (index,obj) {
            var num = obj.Stock - obj.Used;
            if(num <= 0){
                return true;
            }
            content += "<tr>" +
                "<td>" + obj.LabNo + "</td>" +
                "<td>" + obj.FacNo + "</td>" +
                "<td>" + obj.FacName + "</td>" +
                "<td>" + obj.FacModel + "</td>" +
                "<td>" + num + "</td>" +
                "<td><a href=\"#\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"right\" data-content=\"" + obj.Information + "\">详细信息</a></td>"+
                "<td><a href=\"#\" name=\"borrowBtn\">借用</a></td>" +
                "</tr>";
        });
        $("#firstTbody").html(content);
        $("#StateInfo").trigger("update");
        popover();
        firstTable();
        checkInfo();
        isManager();
    });
}

function refresh_2() {
    $.post('../../src/refreshTableJson.php', {
        No : "2"
    }, function(data) {
        var jsonObj = eval( "(" + data + ")" );
        var content ="";
        $.each(jsonObj, function (index,obj) {
            content += "<tr>" +
                "<td><input type=\"checkbox\" name=\"followBox\"></td>" +
                "<td>" + obj.LabNo + "</td>" +
                "<td>" + obj.FacNo + "</td>" +
                "<td>" + obj.FacName + "</td>" +
                "<td>" + obj.FacModel + "</td>" +
                "<td>" + obj.Stock + "</td>" +
                "<td><a href=\"#\" name=\"updateBtn\" data-toggle=\"modal\" data-target=\"#updateModal\">修改</a></td>" +
                "<td><a href=\"#\" name=\"deleteBtn\" data-toggle=\"modal\" data-target=\"#deleteModal\">删除</a></td>" +
                "</tr>";
        });
        $("#secondTbody").html(content);
        $("#ManageInfo").trigger("update");
        secondTable();
        deleteFac();
    });
}

function refresh_3() {
    $.post('../../src/refreshTableJson.php', {
        No : "3",
        type : isManagers
    }, function(data) {
        var jsonObj = eval( "(" + data + ")" );
        var content ="";
        $.each(jsonObj, function (index,obj) {
            content += "<tr>" +
                "<td>" + obj.ids + "</td>" +
                "<td>" + checkNull(obj.names) + "</td>" +
                "<td>" + checkNull(obj.college) + "</td>" +
                "<td>" + obj.sdate + "</td>" +
                "<td>" + obj.edate + "</td>" +
                "<td style='display: none'>" + obj.facno + "</td>" +
                "<td>" + obj.facname + "</td>" +
                "<td>" + checkNull(obj.tele) + "</td>" +
                "<td>" + getState(obj.state) + "</td>";
                // "<td>" + obj.uselong + " 天</td>" +
                // "<td><a href=\"#\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"right\" data-content=\"" + checkNull(obj.aim) + "\">详细信息</a></td>";
            if(isManagers==0){          //普通用户
                if(obj.state=='102'||obj.state=='103')
                    content += "<td><a href='#' name='renew' class='disabled'>续借</a></td>";
                else
                    content += "<td><a href='#' name='renew'>续借</a></td>";
            }else if(isManagers==1){
                if(obj.state=='103')
                    content += "<td><a href='#' name='remind' class='disabled'>提醒 </a>/<a href='#' name='revet' class='disabled'> 归还</a></td>";
                else
                    content += "<td><a href='#' name='remind'>提醒 </a>/<a href='#' name='revet'> 归还</a></td>";
            }
               content += "</tr>";
        });
        $("#thirdTbody").html(content);
        $("#BorrowInfo").trigger("update");
        popover();
        revet();
        renew();
        remind();
    });
}

function getState(state) {
    switch (state){
        case '100':
            return "<span class='normalState'>正常</span>";
        case '101':
            return "<span class='willExpire'>即将过期</span>";
        case '102':
            return "<span class='haveExpire'>已过期</span>";
        case '103':
            return "<span class='haveReturn'>已归还</span>";
    }
}

function refresh_4() {
    $.post('../../src/refreshTableJson.php', {
        No : "4"
    }, function(data) {
        var jsonObj = eval( "(" + data + ")" );

        $("#collegeInput").val(checkNull(jsonObj.college));
        $("#nameInput").val(checkNull(jsonObj.name));
        $("#telInput").val(checkNull(jsonObj.telphone));
        $("#college").val(checkNull(jsonObj.college));
        $("#StuName").val(checkNull(jsonObj.name));
        $("#Telenum").val(checkNull(jsonObj.telphone));
    });
}

//设备归还
function revet() {
    $('[name=revet]').click(function () {
        var fac_id = $(this).parents("tr").find("td").eq(5).text().trim();
        var user_id = $(this).parents("tr").find("td").eq(0).text().trim();
        // alert(fac_id + " " + user_id);
        $.ajax({
            type: "POST",
            data:{
                facid:fac_id,
                userid:user_id
            },
            url: "../../src/revetServ.php",
            success: function(data) {
                if(data=="true"){
                    Messenger().post({message: '归还成功', type: 'success', showCloseButton: true});
                    refresh_3();
                }
                else if(data=="false") {
                    Messenger().post({message: '提交失败 请重试', type: 'error', showCloseButton: true});
                }
                else {
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            }
        });
    });
}

//设备续借
function renew() {
    $('[name=renew]').click(function () {
        var fac_id = $(this).parents("tr").find("td").eq(5).text().trim();
        var user_id = $(this).parents("tr").find("td").eq(0).text().trim();
        // alert(fac_id + " " + user_id);
        $.ajax({
            type: "POST",
            data:{
                facid:fac_id,
                userid:user_id
            },
            url: "../../src/renewServ.php",
            success: function(data) {
                if(data=="true"){
                    Messenger().post({message: '续借成功', type: 'success', showCloseButton: true});
                    refresh_3();
                }
                else if(data=="false") {
                    Messenger().post({message: '提交失败 不可重复续借', type: 'error', showCloseButton: true});
                }
                else {
                    Messenger().post({message: '未知错误', type: 'error', showCloseButton: true});
                }
            }
        });
    });
}

//提醒
function remind() {
    $('[name=remind]').click(function () {

        var facid = $(this).parents("tr").find("td").eq(5).text().trim();
        var userid = $(this).parents("tr").find("td").eq(0).text().trim();
        // alert(array[0]['facid']);
        $.ajax({
            type: "POST",
            data:{
                facid:facid,
                userid:userid,
                type:0
            },
            url: "../../src/remindServ.php",
            success: function(data) {
                switch (data) {
                    case '100':
                    case '200':
                    case '302':
                        Messenger().post({message: '信息发送失败 请重试', type: 'error', showCloseButton: true});
                        break;
                    case '300':
                        Messenger().post({message: '信息发送失败 日提醒次数上限为3条', type: 'error', showCloseButton: true});
                        break;
                    case '301':
                        Messenger().post({message: '提醒成功 信息已发送', type: 'success', showCloseButton: true});
                        break;
                    case '303':
                        Messenger().post({message: '信息发送失败 反垃圾', type: 'error', showCloseButton: true});
                        break;
                }
            }
        });
    });
}

function remindAll() {
    
}