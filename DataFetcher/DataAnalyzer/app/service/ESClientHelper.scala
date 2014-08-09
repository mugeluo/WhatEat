package service

import play.api.Logger
import scala.util.{Try, Success, Failure}
import org.elasticsearch.client.transport.TransportClient
import org.elasticsearch.common.transport.InetSocketTransportAddress
import org.elasticsearch.client.Client
import org.elasticsearch.node.NodeBuilder._
import org.elasticsearch.common.xcontent.XContentFactory._
import org.elasticsearch.common.settings.ImmutableSettings


/**
 * Client generation and GRUD operation
 *
 * Tiner 2014-2-8
 */
object ESClientHelper {
  private val ES_HOST = "127.0.0.1"
  private val ES_PORT = 9300
  private val INDEX = "KCF_TINKER"
  private val CLUSTER_NAME = "KCF_TINKER"

  val settings = ImmutableSettings.settingsBuilder().
    put("cluster.name", CLUSTER_NAME).
    put("node.client", true).
    put("node.data", false).
    put("client.transport.sniff", true).
    build();

  val client = new TransportClient(settings).addTransportAddress(
    new InetSocketTransportAddress(ES_HOST, ES_PORT))

  def getClient: Client = client

  /**
   * use the node client
   */
  def fireWithNode(f: Client => Unit) = {
    val node = nodeBuilder().clusterName(CLUSTER_NAME).node()
    implicit val client = node.client()

    f(client)

    client.close
    node.close
  }

  /**
   * use the direct transport client
   */
  def fire(f: Client => Unit) = {
    val settings = ImmutableSettings.settingsBuilder()
        .put("cluster.name", CLUSTER_NAME).build();

    implicit val client = new TransportClient(settings)
      .addTransportAddress(new InetSocketTransportAddress(ES_HOST, ES_PORT))

    f(client)

    client.close
  }

  def doSend(jsonData: String, id: String, indexType: String)(implicit client: Client) = {
    Try{
      client.prepareIndex(INDEX, indexType, id)
      .setSource(jsonData)
      .execute()
      .actionGet()
    } match {
      case Success(_) => Logger.debug("send " + indexType + "[" + id + "] successfully") 
      case Failure(e) => Logger.error("send failed", e)
    }
    
  }

  /**
   *  Here, update just the rewriter the document in ES
   */
  def doUpdate(jsonData: String, id: String, indexType: String)(implicit client: Client) = {
    Logger.info("update " + indexType + " id : " + id)

    doDelete(id, indexType)
    doSend(jsonData, id, indexType)
  }

  def doDelete(id: String, indexType: String)(implicit client: Client) = {
    client.prepareDelete(INDEX, indexType, id)
      .execute()
      .actionGet()
  }
}