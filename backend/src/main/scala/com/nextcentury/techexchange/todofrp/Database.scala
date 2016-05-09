package com.nextcentury.techexchange.todofrp

import scala.collection.mutable.{ Map => MutableMap }

/**
  * A simple in-memory database of Todos
  */
object Database {
  val todos = MutableMap.empty: MutableMap[Int, Todo]
}
