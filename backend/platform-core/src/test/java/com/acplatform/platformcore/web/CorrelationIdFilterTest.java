package com.acplatform.platformcore.web;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import com.acplatform.platformcore.id.IdGenerator;
import jakarta.servlet.FilterChain;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.Test;
import org.slf4j.MDC;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

class CorrelationIdFilterTest {

  @Test
  void generatesAndPropagatesCorrelationIdWhenHeaderAbsent() throws Exception {
    IdGenerator idGenerator = mock(IdGenerator.class);
    UUID generated = UUID.fromString("018f8f2a-1234-7abc-8def-0123456789ab");
    when(idGenerator.newId()).thenReturn(generated);

    CorrelationIdFilter filter = new CorrelationIdFilter(idGenerator);
    MockHttpServletRequest request = new MockHttpServletRequest("GET", "/v1/system/health");
    MockHttpServletResponse response = new MockHttpServletResponse();
    AtomicReference<String> mdcDuringChain = new AtomicReference<>();
    FilterChain chain = (req, res) -> mdcDuringChain.set(MDC.get(CorrelationIdContext.MDC_KEY));

    filter.doFilter(request, response, chain);

    assertThat(mdcDuringChain.get()).isEqualTo(generated.toString());
    assertThat(response.getHeader(CorrelationIdFilter.HEADER_NAME)).isEqualTo(generated.toString());
    // The filter must clear the MDC entry once the request completes so it never
    // leaks into an unrelated request handled by the same pooled thread.
    assertThat(MDC.get(CorrelationIdContext.MDC_KEY)).isNull();
  }

  @Test
  void reusesIncomingCorrelationIdHeaderInsteadOfGeneratingOne() throws Exception {
    IdGenerator idGenerator = mock(IdGenerator.class);
    CorrelationIdFilter filter = new CorrelationIdFilter(idGenerator);

    MockHttpServletRequest request = new MockHttpServletRequest("GET", "/v1/system/health");
    request.addHeader(CorrelationIdFilter.HEADER_NAME, "incoming-correlation-id");
    MockHttpServletResponse response = new MockHttpServletResponse();
    AtomicReference<String> mdcDuringChain = new AtomicReference<>();
    FilterChain chain = (req, res) -> mdcDuringChain.set(MDC.get(CorrelationIdContext.MDC_KEY));

    filter.doFilter(request, response, chain);

    assertThat(mdcDuringChain.get()).isEqualTo("incoming-correlation-id");
    assertThat(response.getHeader(CorrelationIdFilter.HEADER_NAME))
        .isEqualTo("incoming-correlation-id");
    verifyNoInteractions(idGenerator);
  }
}
