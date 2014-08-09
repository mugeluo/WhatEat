
var Index = new Object();

Index.Init = function () {
    Index.BindEvent();
}

Index.BindEvent= function () {
    $(".btn_userAuto").click(function () {
        $.layer({
            type: 1,
            shade: [0],
            area: ['auto', 'auto'],
            title: false,
            border: [0],
            page: {

                html: '<div style="width:420px; height:260px; padding:20px; border:1px solid #06c; background-color:#eee;">demo</div>'
            }
        });

    });
}

$(function () {
    Index.Init();
});