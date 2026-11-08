package com.fleetmaintenance.common;

import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.time.OffsetDateTime;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<?> validation(MethodArgumentNotValidException ex) {
        var errors=ex.getBindingResult().getFieldErrors().stream()
                .map(e->Map.of("field",e.getField(),"message",e.getDefaultMessage()==null?"Invalid value":e.getDefaultMessage())).toList();
        return ResponseEntity.badRequest().body(Map.of("timestamp",OffsetDateTime.now(),"status",400,"error","Validation failed","details",errors));
    }
    @ExceptionHandler(ResponseStatusException.class)
    ResponseEntity<?> status(ResponseStatusException ex) {
        int status=ex.getStatusCode().value();
        return ResponseEntity.status(status).body(Map.of("timestamp",OffsetDateTime.now(),"status",status,
                "error",ex.getReason()==null?"Request failed":ex.getReason()));
    }
    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<?> badRequest(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("timestamp",OffsetDateTime.now(),"status",400,"error",ex.getMessage()));
    }
}
