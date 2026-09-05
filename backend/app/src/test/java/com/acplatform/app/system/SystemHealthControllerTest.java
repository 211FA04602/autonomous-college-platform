package com.acplatform.app.system;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.acplatform.platformcore.error.ProblemDetailsExceptionHandler;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import org.junit.jupiter.api.Test;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

/**
 * Unit-level slice test (no Spring context, no database) verifying the {@code GET
 * /v1/system/health} contract that {@code docs/api/openapi.yaml} and the frontend's {@code
 * systemHealthResponseSchema} both describe.
 */
class SystemHealthControllerTest {

  private static final Clock FIXED_CLOCK =
      Clock.fixed(Instant.parse("2026-09-05T10:15:30Z"), ZoneOffset.UTC);

  private static MockMvc mockMvcFor(HealthEndpoint healthEndpoint) {
    SystemHealthController controller =
        new SystemHealthController(healthEndpoint, "0.1.0-foundation", FIXED_CLOCK);
    return MockMvcBuilders.standaloneSetup(controller)
        .setControllerAdvice(new ProblemDetailsExceptionHandler())
        .build();
  }

  @Test
  void returnsUpStatusWithVersionAndTimestampWhenHealthy() throws Exception {
    HealthEndpoint healthEndpoint = mock(HealthEndpoint.class);
    when(healthEndpoint.health()).thenReturn(Health.up().build());

    mockMvcFor(healthEndpoint)
        .perform(get("/v1/system/health"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.status").value("UP"))
        .andExpect(jsonPath("$.version").value("0.1.0-foundation"))
        .andExpect(jsonPath("$.timestampUtc").value("2026-09-05T10:15:30Z"));
  }

  @Test
  void returnsDegradedAsA200WhenOutOfService() throws Exception {
    HealthEndpoint healthEndpoint = mock(HealthEndpoint.class);
    when(healthEndpoint.health()).thenReturn(Health.outOfService().build());

    mockMvcFor(healthEndpoint)
        .perform(get("/v1/system/health"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("DEGRADED"));
  }

  @Test
  void returnsServiceUnavailableProblemDetailsWhenDown() throws Exception {
    HealthEndpoint healthEndpoint = mock(HealthEndpoint.class);
    when(healthEndpoint.health()).thenReturn(Health.down().build());

    mockMvcFor(healthEndpoint)
        .perform(get("/v1/system/health"))
        .andExpect(status().isServiceUnavailable())
        .andExpect(content().contentType(MediaType.APPLICATION_PROBLEM_JSON))
        .andExpect(jsonPath("$.status").value(503))
        .andExpect(jsonPath("$.title").value("System unavailable"))
        .andExpect(jsonPath("$.correlationId").exists());
  }
}
