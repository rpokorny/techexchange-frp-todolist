package com.nextcentury.techexchange.todofrp

/**
  * Simple DTO for Todo creation.  Contains all Todo fields except id
  */
case class TodoDto(val name: String, val completed: Boolean)
