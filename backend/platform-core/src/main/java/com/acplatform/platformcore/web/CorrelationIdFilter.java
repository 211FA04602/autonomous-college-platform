package com.acplatform.platformcore.web;

import com.acplatform.platformcore.id.IdGenerator;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.slf4j.MDC;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Reads {@code X-Correlation-Id} from the incoming request, generating one if absent, puts it in
 * the logging MDC for the lifetime of the request, and echoes it back on the response header so
 * callers and RFC 7807 error responses can all reference the same value.
 *
 * <p>Deliberately <em>not</em> a {@code @Component} — the {@code app} composition root owns
 * registering this filter (its bean-registration order, URL pattern, and precedence), per
 * docs/architecture/MODULE_BOUNDARIES.md.
 */
public class CorrelationIdFilter extends OncePerRequestFilter {

  public static final String HEADER_NAME = "X-Correlation-Id";

  private final IdGenerator idGenerator;

  public CorrelationIdFilter(IdGenerator idGenerator) {
    this.idGenerator = idGenerator;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String incoming = request.getHeader(HEADER_NAME);
    String correlationId =
        (incoming != null && !incoming.isBlank()) ? incoming : idGenerator.newId().toString();

    MDC.put(CorrelationIdContext.MDC_KEY, correlationId);
    response.setHeader(HEADER_NAME, correlationId);
    try {
      filterChain.doFilter(request, response);
    } finally {
      MDC.remove(CorrelationIdContext.MDC_KEY);
    }
  }
}
