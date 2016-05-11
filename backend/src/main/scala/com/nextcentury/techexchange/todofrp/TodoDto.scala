package com.nextcentury.techexchange.todofrp

import java.net.URI

/**
  * Simple DTO for Todo creation.  Contains all Todo fields except id
  */
case class TodoInDto(val name: String, val completed: Boolean)

/**
  * Simple DTO for Todo serialization.  Differs from the actual domain model in
  * that it represents the id as a URI which can be used for REST interactions with the
  * Todo
  */
case class TodoOutDto(val id: URI, val name: String, val completed: Boolean)
