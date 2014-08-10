/*
 * 词库生成
 * 老牛 - 2014-8-10
 * 老牛累了，想要睡觉！！！！！！
 */

var categories = require("./categories.js").categories;

var words = [];
function getWords(cates) {
  for(var i = 0, len = cates.length; i < len; i++) {
    var crrCategory = categories[i];
    var crrCategoryName = crrCategory.category_name;
    words.push(crrCategoryName);

    var subCategories = crrCategory.subcategories;
    // for(var k = 0, klen = subCategories.length; k < klen; k++) {
    //   var crrSub = subCategories[k];
    //   if(crrSub instanceof String) {
    //     words.push(crrSub);

    //   } else if(crrSub instanceof Object) {
    //     getWords(crrSub);
    //   }
    // }
    if(subCategories.length > 0) {
      getWords(subCategories);
    }
  }
};

getWords(categories);

console.log(words);

