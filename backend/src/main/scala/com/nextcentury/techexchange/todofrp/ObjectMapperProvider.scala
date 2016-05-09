package com.nextcentury.techexchange.todofrp

import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.scala.DefaultScalaModule

@Provider
class ObjectMapperProvider extends ContextResolver[ObjectMapper] {
  private val objectMapper = new ObjectMapper().registerModule(DefaultScalaModule)

  override def getContext(cls: Class[_]): ObjectMapper = objectMapper
}
