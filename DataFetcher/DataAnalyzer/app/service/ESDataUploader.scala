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
 * 数据上传器，将数据库中的数据上传到ES中去
 *
 * 老牛 - 2014-8-9
 */
object ESDataUploader {

  /** 上传商户信息 */
  def uploadMerchatsFromDB: Unit = {
    MerchantService.getMerchant("select * from Merchant").map { merch =>
      var mid = (merch \ "businessId").as[Long]
      ESClientHelper.fire { client =>
        ESClientHelper.doSend(
          merch.toString, mid.toString, "merchant"
        )(client)
      }
    }
  }



}

