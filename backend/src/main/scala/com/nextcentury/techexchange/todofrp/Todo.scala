package com.nextcentury.techexchange.todofrp

case class Todo(val id: Int, val name: String, val completed: Boolean)

object Todo {
  def fromDto(dto: TodoDto, id: Int): Todo = new Todo(id, dto.name, dto.completed)
}
