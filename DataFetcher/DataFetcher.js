/**
 * DataFetcher，用于从大众点评网中
 * 获取数据，然后将数据存储到数据库
 * 
 * 老牛 - 2014-8-8
 */

var http   = require("http");
var config = require("./conf/config.json").platform;
var events = require('events');
var util   = require('util');
var sha1   = require("sha1");
var BufferHelper = require('bufferhelper');

var DataFetcher = function() {
  this.bufferHelper = new BufferHelper();
  events.EventEmitter.call(this);
};

util.inherits(DataFetcher, events.EventEmitter);

/* 获取商户信息 */
DataFetcher.prototype.fetchMerchants = function() {
  var _this = this;
  
  var path = config.path.merchant + this.getQueryString();
  var opts = {
    hostname: config.base_url,
    path:     path,
    method:   "get"
  };

  console.log(opts);

  var request = http.request(opts, function(res){
    console.log("connected -- status: " + res.statusCode);
    _this.emit("connected");
  });

  request.on("error", function(err){
    console.error(err);
  });

  request.on("data", function(data){
    console.log(data);
    _this.bufferHelper.concat(data);
  });

  request.on("end", function(){
    var buffer = _this.bufferHelper.toBuffer();
    var data = buffer.toString();

    console.log(data);

    _this.bufferHelper.empty();
    _this.emit('merchants', data);

  });

  request.setTimeout(30000, function() {
    console.error("what the fuck, timeout");
  });

  request.end();
};

DataFetcher.prototype.sign = function(paras) {
  if(paras) {
    var keys = [];
    for(var key in paras) {
      keys.push(key);
    }
    keys.sort();

    var queryStr = config.appKey;
    for(var i = 0, len = keys.length; i < len; i++){
      var key = keys[i];
      queryStr += (key + paras[key]);
    }

    queryStr += config.appSecret;

    console.log(queryStr);

    return sha1(queryStr).toUpperCase();
  } else {
    console.error("invalid paras");
    return null;
  }
};

//组装请求参数
DataFetcher.prototype.getParas = function () {
  return {
    //city: "上海",
//    category: "美食",
  //  keyword: "美食",
    latitude: 31.21524,
    longitude: 121.420033,
    limit: 1
  };
};

DataFetcher.prototype.getQueryString = function() {
  var paras = this.getParas();
  var sign = this.sign(paras)

  var queryStr = "?appkey=" + config.appKey + "&";
  for(var key in paras) {
    queryStr += (key + "=" + paras[key] + "&");
  }
  queryStr += ("sign=" + sign);

  return queryStr;
};

module.exports = DataFetcher;


