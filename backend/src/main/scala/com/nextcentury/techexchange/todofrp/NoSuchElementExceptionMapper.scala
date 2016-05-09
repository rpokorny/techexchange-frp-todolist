package com.nextcentury.techexchange.todofrp

import javax.ws.rs.ext.ExceptionMapper
import javax.ws.rs.ext.Provider
import javax.ws.rs.core.Response
import javax.ws.rs.Produces

@Provider
@Produces(Array("application/json"))
class NoSuchElementExceptionMapper extends ExceptionMapper[NoSuchElementException] {
  override def toResponse(exception: NoSuchElementException) =
    Response.status(Response.Status.NOT_FOUND).entity(exception).build
}
