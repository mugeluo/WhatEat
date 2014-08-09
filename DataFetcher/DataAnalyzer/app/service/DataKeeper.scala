package service

import play.api.db.DB
import anorm.SQL
import anorm.SqlParser._
import play.api.Logger
import play.api.libs.json._
import play.api.Play.current
import scala.concurrent.{future, ExecutionContext, Future}
import ExecutionContext.Implicits.{global => executeGlobal}

/**
 * 数据保存类
 * 老牛 -2014-8-9
 */
object DataKeeper {

  def saveMerchatns(data: JsValue): Unit = {
    val status = (data \ "status").as[String]
    if(status == "OK") {
      val totalCount = (data \ "total_count").as[Int]
      val crrCount = (data \ "count").as[Int]

      Logger.info(s"""
        status: ${status}, 
        total_count: ${totalCount}, 
        current_count: ${crrCount}"""
      )

      val merchantJsons = (data \ "businesses").as[JsArray].value
      
      Logger.debug(merchantJsons.head.toString)

      this.doSave(merchantJsons)
    } else {
      Logger.warn(s"fuck, error --> ${data}")
    }
  }

  //TODO 保存到数据库的时候，需要进行去重
  private def doSave(merchants: Seq[JsValue]): Unit = if(merchants.nonEmpty) {
    val sql = "insert into Merchant values " +
      merchants.map { m =>
        s"""(
          '${(m \ "business_id").as[Long]}',
          '${(m \ "name").as[String]}',
          '${(m \ "branch_name").as[String]}',
          '${(m \ "address").as[String]}',
          '${(m \ "telephone").as[String]}',
          '${(m \ "city").as[String]}',
          '${(m \ "regions").as[JsArray].value.map(_.as[String]).mkString("#")}',
          '${(m \ "categories").as[JsArray].value.map(_.as[String]).mkString("#")}',
          '${(m \ "latitude").as[Float].toString}',
          '${(m \ "longitude").as[Float].toString}',
          '${((m \ "avg_rating").as[Float] * 10).toInt}',
          '${(m \ "product_grade").as[Int]}',
          '${(m \ "decoration_grade").as[Int]}',
          '${(m \ "service_grade").as[Int]}',
          '${((m \ "product_score").as[Float] * 10).toInt}',
          '${((m \ "decoration_score").as[Float] * 10).toInt}',
          '${((m \ "service_score").as[Float] * 10).toInt}',
          '${(m \ "s_photo_url").as[String]}',
          '${(m \ "business_url").as[String]}',
          '${(m \ "review_count").as[Int]}',
          '${(m \ "distance").as[Int]}'
        )"""
      }.mkString(",")    

      DB.withConnection { implicit conn =>
        val num = SQL(sql).executeUpdate()

        Logger.info(s"${num} merchants saved to DB")
      }
  }

}