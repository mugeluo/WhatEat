
var Index = new Object();
Index.Option =
{
    layerIndex:0
}

Index.Init = function () {
    Index.BindEvent();
}

Index.BindEvent= function () {
    $(".btn_userAuto").bind("click",function () {
        var html = '<div style="width:420px; height:260px; padding:20px;border:2px solid #c07452; background-color:#eee;border-radius:4px;">';
        html += '<input type="button" onclick="Index.DialogClose();" value="close"/>';
        html += '</div>';

        Index.Option.layerIndex = $.layer({
            type: 1,
            shade: [0.3, '#000'],
            area: ['auto', 'auto'],
            title: false,
            closeBtn: [0, true],
            border: [0],
            shift: "top",
            fix: true,
            page: {
                html: html
            }
        });

    });
}

Index.DialogClose = function () {
    layer.close(Index.Option.layerIndex);

    var html = '<div style="width:420px; height:260px; padding:20px;border:2px solid #c07452; background-color:#eee;border-radius:4px;">';
    html += '<input type="button" onclick="Index.DialogClose();" value="close"/>';
    html += '</div>';

    Index.Option.layerIndex = $.layer({
        type: 1,
        shade: [0.3, '#000'],
        area: ['auto', 'auto'],
        title: false,
        closeBtn: [0, true],
        border: [0],
        shift: "top",
        fix: true,
        page: {
            html: html
        }
    });
}

$(function () {
    layer.load(1);

    setTimeout(function () {
        $(".pageLayer").hide();
        $("body").css("backgroundColor", "#fff");
        $(".pageAll").show();
    }, 1000);

    Index.Init();
});