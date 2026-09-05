package com.acplatform.app.system;

import com.acplatform.platformcore.web.CorrelationIdContext;
import java.net.URI;
import java.time.Clock;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.boot.actuate.health.Status;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The one real vertical slice wired together in this foundation prompt: a versioned, public REST
 * endpoint (constitution rule 5) backed by Spring Boot Actuator's health aggregation, returning RFC
 * 7807 Problem Details on failure (constitution rule 12).
 *
 * <p>Mirrors {@code docs/api/openapi.yaml} and the frontend's {@code systemHealthResponseSchema} /
 * {@code fetchSystemHealth} contract exactly.
 */
@RestController
@RequestMapping("/v1/system")
public class SystemHealthController {

  private final HealthEndpoint healthEndpoint;
  private final String appVersion;
  private final Clock clock;

  @Autowired
  public SystemHealthController(
      HealthEndpoint healthEndpoint, @Value("${app.version:0.0.0-unknown}") String appVersion) {
    this(healthEndpoint, appVersion, Clock.systemUTC());
  }

  SystemHealthController(HealthEndpoint healthEndpoint, String appVersion, Clock clock) {
    this.healthEndpoint = healthEndpoint;
    this.appVersion = appVersion;
    this.clock = clock;
  }

  @GetMapping("/health")
  public ResponseEntity<Object> health() {
    SystemHealthStatus status = resolveStatus();
    Instant now = Instant.now(clock);
    String timestampUtc = DateTimeFormatter.ISO_INSTANT.format(now);

    if (status == SystemHealthStatus.DOWN) {
      ProblemDetail problem =
          ProblemDetail.forStatusAndDetail(
              HttpStatus.SERVICE_UNAVAILABLE,
              "The system is currently unavailable. Retry after a short delay.");
      problem.setType(URI.create("https://docs.acplatform.dev/problems/system-unavailable"));
      problem.setTitle("System unavailable");
      problem.setProperty("correlationId", CorrelationIdContext.currentOrUnknown());
      problem.setProperty("timestampUtc", timestampUtc);
      return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
          .contentType(MediaType.APPLICATION_PROBLEM_JSON)
          .body(problem);
    }

    SystemHealthResponse body = new SystemHealthResponse(status.name(), appVersion, timestampUtc);
    return ResponseEntity.ok(body);
  }

  private SystemHealthStatus resolveStatus() {
    Status status = healthEndpoint.health().getStatus();
    if (Status.UP.equals(status)) {
      return SystemHealthStatus.UP;
    }
    if (Status.DOWN.equals(status)) {
      return SystemHealthStatus.DOWN;
    }
    // OUT_OF_SERVICE, UNKNOWN, or any custom status: report DEGRADED rather than
    // silently claiming UP or hard-failing the whole system as DOWN.
    return SystemHealthStatus.DEGRADED;
  }
}
