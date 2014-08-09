//这是初始化方法，用来绘制google地图
 function init() {
    //首先必须判断浏览器是否有geolocation属性，因为HTML5 才新增了这个属性，不是所有浏览器都支持
    if (navigator.geolocation) {
        //如果浏览器支持geolocation，则使用geolocation的getCurrentLocation方法来取得用户当前的地理位置，
        //并且在成功取得之后调用show_map()回调函数
        navigator.geolocation.getCurrentPosition(show_map,handle_error ,null);
    } 
    else
    {
      console.log(' Browser doesnt support geolocation ');
     }
 }

 //这是一个回调函数，用于当geolocation成功取得用户浏览器所在的地理位置时候的响应，它吧所有的位置信息封装在position中
 //所以我们就需要解析position来取得用户的详细信息
function show_map(position) {
    // 取得当前的地理位置
    var coords = position.coords;
    //Part 1; 显示用户的精确位置信息
    //取得页面上用于显示精确位置信息的组件
    //var positionInfo=document.getElementById("positionInfo");
    // var positionString="经度: "+coords.longitude+"<br>";
    //var altitude=coords.altitude;
    //if( altitude!=null)
    //{
    //    positionString+="海拔高度"+coords.altitude+"<br>";
    //}
    //else
    //{
    //    positionString+="经纬度精确到："+coords.accuracy+"米"+"<br>";
    //}

    //Part 2; 在google地图上显示浏览器的当前位置
   // 设定地图参数，将用户的当前位置的维度和精度都设定为地图的中心点
    var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
    var myOptions = {
        // 设定放大倍数
        zoom : 14,
    // 将地图的中心点设定为指定的坐标点
    center : latlng,
    // 指定地图的类型，这里选择的是街道地图
   mapTypeId : google.maps.MapTypeId.ROADMAP
    };

// 创建地图并在"map"div中显示，吧这个地图叫做map1
var map1;
map1 = new google.maps.Map(document.getElementById("map"), myOptions);

 // 在地图上创建标记
var marker = new google.maps.Marker({
 //标注刚才创建的标注点，因为标注点是由当前的经纬度设定的，所以表示了当前位置
 position : latlng,
//标注在哪张地图上，我们创建了map1作为google map，所以标注在map1上
map : map1
 });
// 设定标注窗口，并且指定该窗口的注释文字
 var infowindow = new google.maps.InfoWindow({
    content : "这是Charles的浏览器的当前位置!"
});
// 打开标注窗口
 infoWindow.open(map1, marker);
}

//这是第二个回调函数，用于当geolocation获取用户浏览器所在的地理位置失败时候的响应
//error对象封装了所有的可能出现的无法获得地理位置的错误信息，并且HTML5为其预留了错误码，可以取值{1,2,3}
 function handle_error(error){
    var errorTypes={
    1:'位置服务被拒绝',
    2:'获取不到位置信息',
    3:'获取信息超时'
    };
 console.log(errorTypes[error.code] + ":,不能确定你的当前地理位置");
}