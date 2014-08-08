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

var DataFetcher = function() {
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

  var request = http.request(opts, function(res){
    console.log(res);
    
    //TODO

    _this.emit("merchants", res);
  });

  request.on("error", function(err){
    console.error(err);
  });
};

DataFetcher.prototype.sign = function(paras) {
  if(paras) {
    //TODO 

  } else {
    console.error("invalid paras");
    return null;
  }
};

//组装请求参数
DataFetcher.prototype.getParas = function () {
  return {
    city: "上海",
    category: "美食",
    keyword: "美食",
    limit: 1
  };
};


DataFetcher.prototype.getQueryString = function() {
  var paras = this.getParas();
  var sign = this.sign(paras)

  var keys = [];
  for(var key in paras) {
    keys.push(key);
  }

  keys.sort();

  var queryStr = config.appKey;
  for(var key in keys){
    queryStr += (key + paras[key]);
  }

  queryStr += config.appSecret;

  return sha1(queryStr).toUpperCase();
}

module.exports = DataFetcher;


