package com.nextcentury.techexchange.todofrp

import javax.ws.rs.{ Path, Produces, PathParam, GET, POST, PUT, DELETE }
import javax.ws.rs.core.{ Context, UriInfo }

@Path("/")
@Produces(Array("application/json"))
class Resource {

  @GET
  def all(@Context uriInfo: UriInfo): Iterable[TodoOutDto] =
    Database.todos.values.map(mkOutDto(uriInfo))

  @GET
  @Path("/{id}")
  def byId(
    @PathParam("id") id: Int,
    @Context uriInfo: UriInfo
  ): TodoOutDto = mkOutDto(uriInfo)(Database.todos(id))

  @POST
  def make(
    @Context uriInfo: UriInfo,
    dto: TodoInDto
  ): TodoOutDto = {
    val maxCurrentId = Database.todos.keys.fold(1)({ case (a, b) => if (a > b) a else b })
    val newId = maxCurrentId + 1
    val todo = new Todo(newId, dto.name, dto.completed)


    Database.todos += (newId -> todo)

    mkOutDto(uriInfo)(todo)
  }

  @PUT
  @Path("/{id}")
  def update(
    @Context uriInfo: UriInfo,
    @PathParam("id") id: Int,
    dto: TodoInDto
  ): TodoOutDto = {
    val existingTodo = Database.todos(id)

    val newTodo = new Todo(id, dto.name, dto.completed)

    Database.todos.update(id, newTodo)

    mkOutDto(uriInfo)(newTodo)
  }

  @DELETE
  @Path("/{id}")
  def delete(
    @Context uriInfo: UriInfo,
    @PathParam("id") id: Int
  ) {
    Database.todos -= id
  }

  private def mkOutDto(uriInfo: UriInfo)(todo: Todo): TodoOutDto = {
    val thisClass = classOf[Resource]
    val getMethod = thisClass.getMethod("byId", classOf[Int], classOf[UriInfo])

    val uriBuilder = uriInfo.getBaseUriBuilder
    val uri = uriBuilder.path(thisClass).path(getMethod).build(Integer.valueOf(todo.id))

    new TodoOutDto(uri, todo.name, todo.completed)
  }
}
