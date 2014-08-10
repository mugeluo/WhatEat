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
 * 商户service类
 *
 * 老牛 - 2014-8-9
 */
object MerchantService {

  def getMerchant(sql: String): List[JsValue] = {
    DB.withConnection { implicit conn =>
      val merchants = SQL(sql)().map { r => Json.obj(
        "businessId" -> r[Long]("businessId"),
        "name"       -> r[String]("name"),
        "branchName" -> r[Option[String]]("branchName"),
        "address"    -> r[String]("address"),
        "phone"      -> r[Option[String]]("phone"),
        "city"       -> r[Option[String]]("city"),
        "regions"    -> r[Option[String]]("regions"),
        "latitude"   -> r[Option[String]]("latitude"),
        "longitude"  -> r[Option[String]]("longitude"),
        "avgRating"  -> r[Int]("avgRating"),
        "productGrade" -> r[Int]("productGrade"),
        "decorationGrade" -> r[Int]("decorationGrade"),
        "serviceGrade" -> r[Int]("serviceGrade"),
        "productScore" -> r[Long]("productScore"),
        "decorationScore" -> r[Long]("decorationScore"),
        "serviceScore" -> r[Long]("serviceScore"),
        "logo" -> r[Option[String]]("logo"),
        "businessUrl" -> r[Option[String]]("businessUrl"),
        "reviewCount" -> r[Int]("reviewCount"),
        "distance"    -> r[Int]("distance")
      )}.toList

      if(merchants.nonEmpty) {
        val ids = merchants.map(x => (x \ "businessId").as[Long])
        val reviewsMap = this.getReviewsByMerchatIds(ids)

        merchants.map { merch =>
          val merchantId = (merch \ "businessId").as[Long]
          val reviews = reviewsMap.get(merchantId).getOrElse(List())
          
          merch ++ Json.obj(
            "reviews" -> reviews.map(_.textExcerpt).mkString("\t\n"),
            "avgReviewRating"     -> this.avgReviewRating(reviews),
            "avgProductRating"    -> this.avgProductRating(reviews),
            "avgDecorationRating" -> this.avgDecorationRating(reviews),
            "avgServiceRating"    -> this.avgServiceRating(reviews)
          )
        }
      } else {
        Logger.info("nothing to upload")
        List()
      }
    }
  }

  def getRandomMerchant: JsValue = {
    val sql = "select * from Merchant order by Rand() limit 1"
    this.getMerchant(sql).head
  }

  private def getReviewsByMerchatIds(ids: List[Long]): Map[Long, List[Review]] = {
    if(ids.nonEmpty) {
      import anorm.SeqParameter
      DB.withConnection { implicit conn =>
        SQL("""
          select 
            reviewId, busiId, textExcerpt, 
            reviewRating, productRating, decorationRating, serviceRating
          from Review where busiId in ({businessIds})
        """).on("businessIds" -> SeqParameter(ids))().map { row =>
          Review(
            row[Long]("busiId"), 
            row[Long]("reviewId"), 
            row[String]("textExcerpt"),
            row[Int]("reviewRating"),
            row[Int]("productRating"),
            row[Int]("decorationRating"),
            row[Int]("serviceRating")
          )
        }.toList.groupBy(_.businessId)
      }
    } else {
      Map()
    }
  }

  private def aggregateContent(reviews: List[Review]): String = {
    if(reviews.nonEmpty) {
      reviews.map( _.textExcerpt ).mkString("\t\n")
    } else {
      ""
    }
  }

  private def avgReviewRating(reviews: List[Review]): Int = {
    if(reviews.nonEmpty) {
      (reviews.map(_.reviewRating).sum / reviews.size).toInt
    } else {
      0
    }
  }

  private def avgProductRating(reviews: List[Review]): Int = {
    if(reviews.nonEmpty) {
      (reviews.map(_.productRating).sum / reviews.size).toInt
    } else {
      0
    }
  }

  private def avgDecorationRating(reviews: List[Review]): Int = {
    if(reviews.nonEmpty) {
      (reviews.map(_.decorationRating).sum / reviews.size).toInt
    } else {
      0
    }
  }

  private def avgServiceRating(reviews: List[Review]): Int = {
    if(reviews.nonEmpty) {
      (reviews.map(_.serviceRating).sum / reviews.size).toInt
    } else {
      0
    }
  }
}

sealed case class Review(
  businessId: Long, 
  reviewId: Long, 
  textExcerpt: String,
  reviewRating: Int,
  productRating: Int, 
  decorationRating: Int,
  serviceRating: Int
)