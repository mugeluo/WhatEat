package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import service.DataQuerier

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  def query(terms: String) = Action { implicit req =>

    Ok(DataQuerier.query(terms))
  }

}