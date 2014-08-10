var Index = new Object();
Index.Option =
{
    layerIndex:0,
    screenWidth:0,
    userChangeCount:0
}

Index.Init = function () {
    var screenWidth = document.body.clientWidth;
    Index.Option.screenWidth = screenWidth - 80;

    Index.BindEvent();
}

Index.BindEvent = function () {
    $("#btn_userAuto").bind("click", function () {
        Index.ShowPopup(Index.CreateHtmlWithDialog());
    });

    $("#btn_userListenGog").bind("click", function () {
        Index.ShowPopup(Index.CreateHtmlWithDialog2());
    });
}

Index.ChangeNextShop = function () {
    Index.ShowPopup( Index.CreateHtmlWithDialog() );
}

Index.CreateHtmlWithDialog = function () {
    Index.Option.userChangeCount = Index.Option.userChangeCount + 1;
    if (Index.Option.userChangeCount < 4) {
        $("#userChangeCount").html(Index.Option.userChangeCount);

        var html = '<div style="width:' + Index.Option.screenWidth + 'px; height:260px; padding:20px;border:2px solid #c07452; background-color:#eee;border-radius:4px;">';
        html += '<div><img src="images/ico_gotoit.png" /></div>';
        html += '<div style="backgroup-color:#fff;padding:10px;">';
        html += '<div class="pAll10">兰州拉面</div>';
        html += '<div class="TxtCenter"><img class="dialogBtnSize" src="images/ico_gotoit.png"/></div>';
        html += '<div class="mTop10 TxtCenter"><img class="dialogBtnSize" onclick="Index.ChangeNextShop();" src="images/ico_changeNext.png"/></div>';
        html += '</div>';
        html += '</div>';
    }
    else
     {
         var html = '<div style="width:' + Index.Option.screenWidth + 'px; height:260px; padding:20px;border:2px solid #c07452; background-color:#eee;border-radius:4px;">';
         html += '<div class="pAll10">兰州拉面</div>';
         html += '<div class="mTop10 TxtCenter"><img class="dialogBtnSize" src="images/btn_godKnow.png"/></div>';
         html += '</div>';
     }

    return html;
}
Index.CreateHtmlWithDialog2 = function () {
    var html = '<div style="width:' + Index.Option.screenWidth + 'px; height:260px; padding:20px;border:2px solid #c07452; background-color:#eee;border-radius:4px;">';
    html += '<div><img src="images/ico_gotoit.png" /></div>';
    html += '<div style="backgroup-color:#fff;padding:10px;">';
    html += '<div class="pAll10">兰州拉面</div>';
    html += '<div class="mTop10 TxtCenter"><img class="dialogBtnSize" src="images/ico_gotoit.png"/></div>';
    html += '</div>';
    html += '</div>';

    return html;
}

Index.ShowPopup = function (html) {
    layer.close(Index.Option.layerIndex);

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
        $("#page").css("background", "none");
        $(".pageAll").show();
    }, 1000);

    Index.Init();
});