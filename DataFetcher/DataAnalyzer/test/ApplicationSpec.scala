import org.specs2.mutable._
import org.specs2.runner._
import org.junit.runner._

import play.api.test._
import play.api.test.Helpers._

/**
 * Add your spec here.
 * You can mock out a whole application including requests, plugins etc.
 * For more information, consult the wiki.
 */
@RunWith(classOf[JUnitRunner])
class ApplicationSpec extends Specification {

  "Application" should {

    "Test Merchants Fetch" in new WithApplication{
      
      //service.DataFetcher.fetchAndSaveMerchantsAndReviews
      service.ESDataUploader.uploadMerchatsFromDB

      Thread.sleep(5000)

      true must equalTo(true)

    }
  }
}
