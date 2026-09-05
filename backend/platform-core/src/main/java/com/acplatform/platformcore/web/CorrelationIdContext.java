package com.acplatform.platformcore.web;

import org.slf4j.MDC;

/**
 * Reads the correlation ID that {@link CorrelationIdFilter} placed into the logging MDC for the
 * current request thread, so any code — including the RFC 7807 Problem Details advice in {@code
 * com.acplatform.platformcore.error} — can attach it to a response without threading a request
 * object through every call site.
 */
public final class CorrelationIdContext {

  /** MDC key every structured log line and error response reads/writes. */
  public static final String MDC_KEY = "correlationId";

  private static final String UNKNOWN = "unknown";

  private CorrelationIdContext() {}

  /** Returns the current request's correlation ID, or {@code "unknown"} if none is set. */
  public static String currentOrUnknown() {
    String value = MDC.get(MDC_KEY);
    return (value != null && !value.isBlank()) ? value : UNKNOWN;
  }
}
