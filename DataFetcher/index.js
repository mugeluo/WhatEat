/**
 * DataFetcher入口
 * 
 * 老牛 - 2014-8-8
 */

var DataFetcher = require("./DataFetcher.js");
var DBHelper = require("./DBHelper.js");

var db = new DBHelper();
var fetcher = new DataFetcher();

fetcher.on("merchants", function(merchants){
  console.log("there comes some merchants");

  db.saveMerchants(merchants);
});


fetcher.fetchMerchants();



