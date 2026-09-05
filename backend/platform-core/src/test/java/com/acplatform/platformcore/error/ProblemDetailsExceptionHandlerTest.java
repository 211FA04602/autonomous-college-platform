package com.acplatform.platformcore.error;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.acplatform.platformcore.web.CorrelationIdContext;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.slf4j.MDC;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

class ProblemDetailsExceptionHandlerTest {

  @RestController
  static class ExplodingController {
    @GetMapping("/boom")
    String boom() {
      throw new IllegalStateException("should never be shown to the client");
    }
  }

  @AfterEach
  void clearMdc() {
    MDC.clear();
  }

  @Test
  void uncaughtExceptionsBecomeRfc7807ProblemDetailsWithCorrelationId() throws Exception {
    MDC.put(CorrelationIdContext.MDC_KEY, "test-correlation-id");
    MockMvc mockMvc =
        MockMvcBuilders.standaloneSetup(new ExplodingController())
            .setControllerAdvice(new ProblemDetailsExceptionHandler())
            .build();

    mockMvc
        .perform(get("/boom"))
        .andExpect(status().isInternalServerError())
        .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON))
        .andExpect(jsonPath("$.status").value(500))
        .andExpect(jsonPath("$.correlationId").value("test-correlation-id"))
        // The generic 500 handler must never leak the raw exception message.
        .andExpect(jsonPath("$.detail").value("An unexpected error occurred."));
  }
}
