/**
 * Created by Administrator on 2017/2/12.
 * index.jsp表单验证的js代码
 */
$(document).ready(function() {
    $('#updatePassForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            newPass: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[A-Za-z0-9]{6,18}$/,
                        message: '格式错误 密码只能包括字母和数字 长度为6-18个字符'
                    }
                }
            },
            oldPass: {},
            newPassAgain: {}
        }
    });
    $('#addFacForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            addLabNo: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9]{4,6}$/,
                        message: '此项不可包括特殊字符或汉字 长度为4-6个字符'
                    }
                }
            },
            addFacNo: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9]{4,6}$/,
                        message: '此项不可包括特殊字符或汉字 长度为4-6个字符'
                    }
                }
            },
            addFacName: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9\u4e00-\u9fa5]{0,16}$/,
                        message: '此项不可包括特殊字符 长度为16个字符以下'
                    }
                }
            },
            addFacMod: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9\u4e00-\u9fa5]{0,20}$/,
                        message: '此项不可包括特殊字符 长度为20个字符以下'
                    }
                }
            },
            addHaveNum: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[0-9]{1,6}$/,
                        message: '此项只可为6位以下的正整数'
                    }
                }
            },
            addDataInfo: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    }
                }
            }
        }
    });
    $('#updateFacForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            upinputLabNo: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9]{4,6}$/,
                        message: '此项不可包括特殊字符或汉字 长度为4-6个字符'
                    }
                }
            },
            upinputFacName: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9\u4e00-\u9fa5]{0,16}$/,
                        message: '此项不可包括特殊字符 长度为16个字符以下'
                    }
                }
            },
            upinputFacMod: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9\u4e00-\u9fa5]{0,20}$/,
                        message: '此项不可包括特殊字符 长度为20个字符以下'
                    }
                }
            },
            upStock: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[0-9]{1,6}$/,
                        message: '此项只可为6位以下的正整数'
                    }
                }
            }
        }
    });

    $('#personalForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            collegeInput: {
                validators: {
                    regexp: {
                        regexp: /^[a-zA-Z\u4e00-\u9fa5]{0,15}$/,
                        message: '此项不可包括特殊字符 长度为15个字符以下'
                    }
                }
            },
            nameInput: {
                validators: {
                    regexp: {
                        regexp: /^[\u4e00-\u9fa5]{2,10}$/,
                        message: '此项不可包括特殊字符 长度为2-10个字符'
                    }
                }
            },
            telInput: {
                validators: {
                    regexp: {
                        regexp: /^1[34578]\d{9}$/,
                        message: '请填写正确的电话号码格式'
                    }
                }
            }
        }
    });

    $('#borrowForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            UseDate: {
                validators: {
                    notEmpty: {
                        message: '此项不可为空'
                    },
                    regexp: {
                        regexp: /^[0-9]{1,4}$/,
                        message: '此项只可为4位以下的正整数'
                    }
                }
            },
            UseAim: {}
        }
    });

    $('#toManageForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            keys: {
                validators: {
                    notEmpty: {
                        message: '请输入邀请码'
                    },
                    regexp: {
                        regexp: /^[0-9A-Z]{16}$/,
                        message: '邀请码格式错误'
                    }
                }
            },
            checkNum: {
                validators: {
                    callback: {
                        message: '答案错误',
                        callback: function(value, validator) {
                            var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
                            return value == sum;
                        }
                    }
                }
            }
        }
    });

    $("#updatePass").on('hide.bs.modal', function () {
        $("#updatePassForm").bootstrapValidator('resetForm',true);
    });

    $("#borrowModal").on('hide.bs.modal', function () {
        $("#borrowForm").bootstrapValidator('resetForm',true);
    });

    $("#addModal").on('hide.bs.modal', function () {
        $("#addFacForm").bootstrapValidator('resetForm',true);
    });

    $("#updateModal").on('hide.bs.modal', function () {
        $("#updateFacForm").bootstrapValidator('resetForm',true);
    });

    $("#toManageModal").on('hide.bs.modal', function () {
        $("#toManageForm").bootstrapValidator('resetForm',true);
    });
});
