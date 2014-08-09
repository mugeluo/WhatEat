package service

import play.api.libs.json.JsValue

/**
 * 数据查询，用户从ES查询数据出来
 * 
 * 老牛 - 2014-8-9
 */
object DataQuerier {

  /*
   * 调用ES client api查询数据。
   * 
   * @words: 查询词条， 每个关键词条用#号隔开
   *    如： 上海#五角场#辣#美食
   */
  def query(words: String): JsValue = {
    //TODO

    null
  }
}