name := """DataAnalyzer"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.1"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  ws,
  "mysql" % "mysql-connector-java" % "5.1.27",
  "commons-codec" % "commons-codec" % "1.8",
  "org.elasticsearch" % "elasticsearch" % "1.2.0"
)
