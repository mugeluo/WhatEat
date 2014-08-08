/**
 * 数据库帮助类，用户将数据save到数据库中去
 *
 * 老牛 - 2014-8-8
 */

var mysql = require('mysql');
var config = require('./conf/config.json');

var DBHelper = function(){};

DBHelper.prototype.saveMerchants = function(merchants) {
  if(merchants && merchants.length > 0){
    console.log("have some merchants to save");
    //TODO
  }
};

module.exports = DBHelper;