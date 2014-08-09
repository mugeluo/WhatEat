package service


import play.api.Logger
import play.api.libs.ws.WS
import play.api.libs.json.{Json, JsValue}
import play.api.Play.current
import scala.util._
import scala.collection.immutable.TreeMap
import scala.concurrent.{future, ExecutionContext, Future}
import ExecutionContext.Implicits.{global => executeGlobal}
import org.apache.commons.codec.digest.DigestUtils

/**
 * 数据获取类
 * 老牛 - 2014-8-9
 */
object DataFetcher {
  private val APP_KEY = "6336413811"
  private val APP_SECRET = "d8331956fd9847198df6d30367817872"
  private val MERCHANT_URL = "http://api.dianping.com/v1/business/find_businesses"
  private val REVIEW_URL ="http://api.dianping.com/v1/review/get_recent_reviews"

  /* 从大众点评获取，存数据库 */
  def fetchMerchants(): Unit = {
    val paras = Map(
      "limit" -> "40", 
      "latitude" -> "31.3096708", 
      "longitude" -> "121.508449"
    )

    val sign = this.sign(paras)

    val fu = WS.url(MERCHANT_URL).withQueryString(
      (("appkey" -> APP_KEY) :: ("sign" -> sign) :: paras.toList): _*
    ).get()

    fu.onComplete {
      case Success(resp) => DataKeeper.saveMerchatns(resp.json)
      case Failure(ex) => Logger.error("", ex)
    }
  }

  def fetchReview(busiId:String):Unit = {
    var paras = Map(
      "business_id" -> busiId
      )
    val sign = this.sign(paras)

    val fu = WS.url(REVIEW_URL).withQueryString(
      (("appkey" -> APP_KEY) :: ("sign" -> sign) :: paras.toList): _*
    ).get()

    fu.onComplete {
      case Success(resp) => DataKeeper.saveReview(resp.json)
      case Failure(ex) => Logger.error("", ex)
    }

  }

  private def sign(paras: Map[String, String]): String = {
    val sortedMap = TreeMap[String, String](paras.toArray: _*)

    val originQury = APP_KEY + sortedMap.map ( x => x._1 + x._2).mkString("") + APP_SECRET
    DigestUtils.sha1Hex(originQury).toUpperCase

  }

  private def mapToQueryString(paras: Map[String, String]): String = {
    paras.map ( x => x._1 + "=" + x._2).mkString("&")
  }

}

