AV.initialize('D6rvDcHFKqPHsxuhn3CSaIzl-gzGzoHsz', 'l4dMbKQEpcNleHu2rL90bmYd');
/**
**  表单验证
**  1.添加检验规则
**  2.添加成功回调
**  3.屏蔽原有submit事件，避免表单提交
**/
$(document)
    .ready(function () {
        $('.ui.form')
            .form({
                fields: {
                    email: {
                        identifier: 'email',
                        rules: [{
                                type: 'empty',
                                prompt: '请输入您的邮箱地址'
                        },
                            {
                                type: 'email',
                                prompt: '请输入正确的邮箱地址'
                }
              ]
                    },
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type: 'empty',
                                prompt: '请输入您的密码'
                },
                            {
                                type: 'length[6]',
                                prompt: '密码至少有六位'
                }
              ]
                    }
                },
                onSuccess: function (event, fields) {
                    $('.ui.form').addClass("loading")
                    var name = $("#email").val();
                    var pwd = $("#pwd").val();
                    AV.User.logIn(name, pwd).then(function () {
                        location.href = 'index.html'
                        $('.ui.form').removeClass("loading")
                    }, function (error) {
                        $('.ui.form').removeClass("loading")
                        console.log(error.code + "" + error.message);
                        showError(error);
                    });
                }
            });
    });
$(document).ready(function () {
    $('.ui.form').submit(function (event) {
        //优先触发事件
        event.preventDefault();
    });
});

function showError(error) {
    var msg;
    switch (error.code) {
    case 1:
        msg = error.message;
        break;
    case 210:
        msg = "用户密码输入错误"
        break;
    case 211:
        msg = "不存在此用户"
        break;
        defalut:
            msg = "登录失败"
    }
    $("#error").text(msg);
    $('.ui.modal').modal('show');
}