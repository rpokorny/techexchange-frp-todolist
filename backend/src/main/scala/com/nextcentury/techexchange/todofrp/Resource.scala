package com.nextcentury.techexchange.todofrp

import javax.ws.rs.{ Path, Produces, PathParam, GET, POST, PUT, DELETE }

@Path("/")
@Produces(Array("application/json"))
class Resource {

  @GET
  def all(): Iterable[Todo] = Database.todos.values

  @GET
  @Path("/{id}")
  def byId(@PathParam("id") id: Int): Todo = Database.todos(id)

  @POST
  def make(dto: TodoDto): Todo = {
    val newId = Database.todos.keys.fold(1)({ case (a, b) => if (a > b) a else b })
    val todo = Todo.fromDto(dto, newId)


    Database.todos += (newId -> todo)

    todo
  }

  @PUT
  @Path("/{id}")
  def update(@PathParam("id") id: Int, todo: Todo): Todo = {
    if (id != todo.id) {
      throw new IllegalArgumentException("Mismatched ids")
    }

    Database.todos.update(id, todo)

    todo
  }

  @DELETE
  @Path("/{id}")
  def delete(@PathParam("id") id: Int) {
    Database.todos -= id
  }
}
