package com.acplatform.platformcore.error;

import com.acplatform.platformcore.web.CorrelationIdContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Shared RFC 7807 Problem Details error handling for every module (constitution rule 12). Extends
 * Spring's {@link ResponseEntityExceptionHandler} so all the built-in Spring MVC exception mappings
 * (validation failures, missing params, etc.) already produce a {@link ProblemDetail} body; this
 * class adds the request's correlation ID (see {@link CorrelationIdContext}) to every such response
 * and provides a last-resort handler for exceptions Spring MVC does not map itself.
 */
@RestControllerAdvice
public class ProblemDetailsExceptionHandler extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleExceptionInternal(
      Exception ex,
      @Nullable Object body,
      HttpHeaders headers,
      HttpStatusCode statusCode,
      WebRequest request) {
    ProblemDetail problemDetail =
        (body instanceof ProblemDetail existing)
            ? existing
            : ProblemDetail.forStatusAndDetail(statusCode, ex.getMessage());
    problemDetail.setProperty("correlationId", CorrelationIdContext.currentOrUnknown());
    return super.handleExceptionInternal(ex, problemDetail, headers, statusCode, request);
  }

  /**
   * Last-resort handler for any exception not already mapped by {@link
   * ResponseEntityExceptionHandler}'s built-in {@code @ExceptionHandler} methods. Never leaks the
   * raw exception message to the client — only a generic detail.
   */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Object> handleUncaught(Exception ex, WebRequest request) {
    ProblemDetail problemDetail =
        ProblemDetail.forStatusAndDetail(
            HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred.");
    problemDetail.setTitle("Internal Server Error");
    problemDetail.setProperty("correlationId", CorrelationIdContext.currentOrUnknown());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .contentType(org.springframework.http.MediaType.APPLICATION_PROBLEM_JSON)
        .body(problemDetail);
  }
}
