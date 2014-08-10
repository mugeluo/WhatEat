var Index = new Object();
//所需参数
Index.Option ={
    layerIndex:0,
    screenWidth:0,
    userChangeCount: 0,
    shopIndex:0
}

//对象初始化
Index.Init = function () {
    var screenWidth = document.body.clientWidth;
    Index.Option.screenWidth = screenWidth - 80;

    Index.BindEvent();
}

//绑定元素事件
Index.BindEvent = function () {
    $("#btn_userAuto").bind("click", function () {
        Index.GetShopInfo(1);
    });

    $("#btn_userListenGog").bind("click", function () {
        Index.GetShopInfo(2);
    });
}

//拼接店铺信息的html
Index.CreateHtmlWithDialog = function () {
    Index.Option.userChangeCount = Index.Option.userChangeCount + 1;
    if (Index.Option.userChangeCount < 4) {
        $("#userChangeCount").html(Index.Option.userChangeCount);

        var html = '<div style="width:' + Index.Option.screenWidth + 'px; height:380px; padding:20px;border:2px solid #c07452; background-color:#eee;border-radius:4px;">';
        html += '<div class="divHidden"><img src="' + $("#txt_shopLogo").val() + '" /></div>';
        html += '<div style="backgroup-color:#fff;padding:5px 10px;">';
        html += '<div class="pAll10 dialogFont">' + $("#txt_shopName").val() + '</div>';
        html += '<div class="TxtCenter"><img onclick="Index.GoToIt();" class="dialogBtnSize" src="images/ico_gotoit.png"/></div>';
        html += '<div class="mTop10 TxtCenter"><img class="dialogBtnSize" onclick="Index.GetShopInfo(1);" src="images/ico_changeNext.png"/></div>';
        html += '</div>';
        html += '</div>';
    }
    else
     {
        var html = '<div style="width:' + Index.Option.screenWidth + 'px; height:auto;  padding:20px;border:2px solid #c07452; background-color:#eee;border-radius:4px;">';
         html += '<div class=" TxtCenter">';
         html += '    <img style=" width:96px;height:160px;" src="images/ico_zhugebei.png" />';
         html += '</div>';
         html += '<div class="pAll10 dialogFont">今日三计锦囊已尽，只能听天由命了...</div>';
         html += '<div class="mTop10 TxtCenter"><img onclick="Index.ListenGod();" class="dialogBtnSize" src="images/btn_listenGod.png"/></div>';
         html += '</div>';
     }

    return html;
}
Index.CreateHtmlWithDialog2 = function () {
    var html = '<div style="width:' + Index.Option.screenWidth + 'px; height:380px; padding:20px;border:2px solid #c07452; background-color:#eee;border-radius:4px;">';
    html += '<div class="divHidden"><img src="' + $("#txt_shopLogo").val() + '" /></div>';
    html += '<div style="backgroup-color:#fff;padding:5px 10px;">';
    html += '<div class="pAll10 dialogFont">' + $("#txt_shopName").val() + '</div>';
    html += '<div class="mTop10 TxtCenter"><img onclick="Index.GoToIt();" class="dialogBtnSize" src="images/ico_gotoit.png"/></div>';
    html += '</div>';
    html += '</div>';

    return html;
}

//弹出店铺信息的弹出层
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

//获取商铺信息
Index.GetShopInfo = function (type) {
    Index.Option.shopIndex = Index.Option.shopIndex + 1;

    if (!(Index.Option.userChangeCount > 3 && type == 1)) {
        layer.load(2);
        $.get('ajaxpage/ajax.aspx', { option: 'GetShopInfo', shopIndex: Index.Option.shopIndex }, function (data) {
            if (data) {
                var result = data.result;
                result = eval("(" + result + ")");
                $("#txt_shopName").val(result.name);
                $("#txt_shopLogo").val(result.logo);
                $("#txt_shopAddress").val(result.address);

                if (type == 1) {
                    Index.ShowPopup(Index.CreateHtmlWithDialog());
                }
                else {
                    Index.ShowPopup(Index.CreateHtmlWithDialog2());
                }
            }

        });
    }
    else
    {
        Index.ShowPopup(Index.CreateHtmlWithDialog());
    }
}

Index.GoToIt = function ()
{
    //var address = $("#txt_shopAddress").val();
    ///** 百度地图API功能 **/
    //var map = new BMap.Map("allmap");            // 创建Map实例
    //map.centerAndZoom(new BMap.Point(121.508449, 31.3096708), 11);
    //var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });
    //driving.search("上海市 杨浦区 淞沪路388号 (近政立路) 创智天地7号楼1层多功能厅", address);
    layer.close(Index.Option.layerIndex);
    location.href = "#map";
}

Index.ListenGod = function () {
    layer.close(Index.Option.layerIndex);
    location.href = "#userListenGog";
}

$(function () {
    layer.load(1);

    setTimeout(function () {
        $(".pageLayer").hide();
        //$("#page").css("background", "none");
        $(".pageAll").show();
    }, 1000);

    Index.Init();
});