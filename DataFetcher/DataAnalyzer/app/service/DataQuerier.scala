package service

import play.api.libs.json._

import org.elasticsearch.index.query.{FilterBuilders, QueryBuilders}
import org.elasticsearch.search.sort.SortOrder
import org.elasticsearch.action.search.{SearchRequestBuilder, SearchResponse}
import org.elasticsearch.search.sort.SortBuilders
import org.elasticsearch.action.count.CountRequestBuilder
import org.elasticsearch.index.query.QueryBuilder
import org.elasticsearch.search.SearchHit

import scala.collection.JavaConverters._
import scala.util.{Try, Success, Failure}

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
  def query(words: String): JsValue = search(words){ builder =>
    builder.setTypes("merchant")
    builder.setQuery(this.customeQueryBuilder(words))
    builder.addSort(SortBuilders.scriptSort(
      """
        1/(
          doc.score + 
          (_source.avgRating > 0? log10(_source.avgRating) : 0) +
          (_source.productGrade > 0? log10(_source.productGrade) : 0) +
          (_source.decorationGrade > 0? log10(_source.decorationGrade) : 0) +
          (_source.serviceGrade > 0? log10(_source.serviceGrade) : 0) +
          (_source.productScore > 0? sqrt(log10(_source.productScore)) : 0 ) + 
          (_source.decorationScore > 0? sqrt(log10(_source.decorationScore)) : 0 ) + 
          (_source.serviceScore > 0? sqrt(log10(_source.serviceScore)) : 0 ) + 
          (_source.distance > 0? log10(_source.distance) : 0) + 
          (_source.avgReviewRating > 0? log10(_source.avgReviewRating) : 0) + 
          (_source.avgProductRating > 0? log10(_source.avgProductRating) : 0) + 
          (_source.avgDecorationRating > 0? log10(_source.avgDecorationRating) : 0) + 
          (_source.avgServiceRating > 0? log10(_source.avgServiceRating) : 0) + 
          (_source.reviewCount > 0? sqrt(log10(_source.reviewCount)) : 0)
        )
      """, 
      "number"
    ))
  
    builder.setSize(1) //只返回一个
    val response = builder.execute().actionGet()
    
    response.getHits().hits().headOption.map { hit =>
      Json.parse(hit.getSourceAsString)
    }.getOrElse{
      Json.obj("error" -> "没有匹配到商户", "status" -> "fail")
    }
  }

  private def search[A](terms: String)(f: SearchRequestBuilder => A): A = {
    val client  = ESClientHelper.getClient
    val request = client.prepareSearch(ESClientHelper.INDEX)

    f(request)
  }

  private def customeQueryBuilder(terms: String): QueryBuilder = {
    QueryBuilders.multiMatchQuery(terms, 
      "name^19", "branchName^18", "address^10", 
      "regions^1.1", "city^1.1", "reviews^11" 
    )
  }
  
}