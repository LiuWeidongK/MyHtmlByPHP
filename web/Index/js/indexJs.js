/**
 * Created by Administrator on 2017/1/26.
 * index.jsp主要Js代码
 */
//详细信息弹出框
function popover(){
    $("[data-toggle='popover']").popover({
        trigger:'manual'
    }).on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 150);
    });
}

var idTmr;
function getExplorer(){  	//判断浏览器
    var explorer = window.navigator.userAgent ;
    //ie
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    }
    //firefox
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome
    else if(explorer.indexOf("Chrome") >= 0){
        return 'Chrome';
    }
    //Opera
    else if(explorer.indexOf("Opera") >= 0){
        return 'Opera';
    }
    //Safari
    else if(explorer.indexOf("Safari") >= 0){
        return 'Safari';
    }
}

//导出到Excel 可行(Excel报错但不影响 不能修改文件名)
function outToExcel(tableid){
    if(getExplorer()=='ie'){
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;

        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = window.setInterval("Cleanup();", 1);
        }

    }else{
        tableToExcel(tableid)
    }
}
function Cleanup() {
    window.clearInterval(idTmr);
    CollectGarbage();
}
var tableToExcel = (function(){
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function(s, c) {
            return s.replace(/{(\w+)}/g,
                function(m, p) { return c[p]; }) };
    return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
        window.location.href = uri + base64(format(template, ctx))
    }
})();

//以两位数形式显示 配合显示时间使用
function fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

//显示时间
function displayTime(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    document.getElementById("Date").innerHTML = year + "/" + fix(month,2) + "/" + fix(day,2) + " " + fix(hour,2) + ":" + fix(minutes,2) + ":" + fix(seconds,2);
    var myTime = setTimeout("displayTime()",1000);
}

//checkbox全选与全不选
function checkAll(obj){
    $("input[name='followBox']").prop('checked', $(obj).prop('checked'));
}

//表单排序 基于Sorttable.js
$(document).ready(function(){
    $("#StateInfo").tablesorter({
        headers: {
            3: {sorter: false},
            4: {sorter: false},
            5: {sorter: false},
            6: {sorter: false}
        }
    });

    $("#ManageInfo").tablesorter({
        headers: {
            0: {sorter: false},
            4: {sorter: false},
            5: {sorter: false},
            6: {sorter: false},
            7: {sorter: false}
        }
    });

    $("#BorrowInfo").tablesorter({
        headers: {
            5: {sorter: false},
            6: {sorter: false},
            7: {sorter: false},
            9: {sorter: false}

        }
    });
});

//JQuery实现表格筛选
$(function(){
    $("#searchId_1").keyup(function(){
        $("#StateInfo tbody tr").show();
        $("#StateInfo tbody tr").has("td:eq(0):not(:contains('" + $(this).val() + "'))").hide();
    }).keyup();
});

$(function(){
    $("#searchId_2").keyup(function(){
        $("#ManageInfo tbody tr").show();
        $("#ManageInfo tbody tr").has("td:eq(1):not(:contains('" + $(this).val() + "'))").hide();
    }).keyup();
});

$(function(){
    $("#searchId_3").keyup(function(){
        $("#BorrowInfo tbody tr").show();
        $("#BorrowInfo tbody tr").has("td:eq(0):not(:contains('" + $(this).val() + "'))").hide();
    }).keyup();
});

//左侧切换Div
$(document).ready(function(){
    $("ul#leftlist li:eq(0)").click(function(){
        $("#content1").show();
        $("#content2").hide();
        $("#content3").hide();
        $("#content4").hide();
        $("ul#leftlist li:eq(0)").addClass("active");
        $("ul#leftlist li:eq(1)").removeClass("active");
        $("ul#leftlist li:eq(2)").removeClass("active");
        $("ul#leftlist li:eq(3)").removeClass("active");
        refresh_1();
    });
    $("ul#leftlist li:eq(1)").click(function(){
        $("#content2").show();
        $("#content1").hide();
        $("#content3").hide();
        $("#content4").hide();
        $("ul#leftlist li:eq(1)").addClass("active");
        $("ul#leftlist li:eq(0)").removeClass("active");
        $("ul#leftlist li:eq(2)").removeClass("active");
        $("ul#leftlist li:eq(3)").removeClass("active");
        refresh_2();
    });
    $("ul#leftlist li:eq(2)").click(function(){
        $("#content3").show();
        $("#content1").hide();
        $("#content2").hide();
        $("#content4").hide();
        $("ul#leftlist li:eq(2)").addClass("active");
        $("ul#leftlist li:eq(0)").removeClass("active");
        $("ul#leftlist li:eq(1)").removeClass("active");
        $("ul#leftlist li:eq(3)").removeClass("active");
        refresh_3();
    });
    $("ul#leftlist li:eq(3)").click(function(){
        $("#content4").show();
        $("#content1").hide();
        $("#content2").hide();
        $("#content3").hide();
        $("ul#leftlist li:eq(3)").addClass("active");
        $("ul#leftlist li:eq(0)").removeClass("active");
        $("ul#leftlist li:eq(1)").removeClass("active");
        $("ul#leftlist li:eq(2)").removeClass("active");
        refresh_4();
    });
});

//生成验证码
$(document).ready(function () {
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 100), '='].join(' '));
});
