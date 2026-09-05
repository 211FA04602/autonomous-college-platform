package com.acplatform.app.config;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

/**
 * Unit-level test (no Spring context) verifying {@link LocalDevCorsConfig}'s allow-list covers
 * every loopback form a browser may present as {@code Origin} for the Vite dev server (localhost,
 * 127.0.0.1, and the IPv6 loopback {@code [::1]}) and never falls back to a wildcard for this
 * credentialed configuration. See the class Javadoc and docs/security/SECURITY_BASELINE.md.
 */
class LocalDevCorsConfigTest {

  @Test
  void allowsExactViteDevServerLoopbackOriginsAndLocalMobileToolingOrigins() {
    CorsConfiguration config = registeredConfiguration();

    assertThat(config.getAllowedOrigins())
        .containsExactlyInAnyOrder(
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://[::1]:5173",
            "http://localhost:8081",
            "http://10.0.2.2:8081",
            "exp://127.0.0.1:19000");
  }

  @Test
  void neverUsesAWildcardOriginForThisCredentialedConfiguration() {
    CorsConfiguration config = registeredConfiguration();

    assertThat(config.getAllowedOrigins()).doesNotContain("*");
    assertThat(config.getAllowedOriginPatterns()).isNull();
    assertThat(config.getAllowCredentials()).isTrue();
  }

  private static CorsConfiguration registeredConfiguration() {
    ExposingCorsRegistry registry = new ExposingCorsRegistry();
    new LocalDevCorsConfig().addCorsMappings(registry);
    return registry.configurationFor("/**");
  }

  /** {@link CorsRegistry#getCorsConfigurations()} is protected; this exposes it to the test. */
  private static final class ExposingCorsRegistry extends CorsRegistry {
    CorsConfiguration configurationFor(String path) {
      Map<String, CorsConfiguration> configurations = getCorsConfigurations();
      return configurations.get(path);
    }
  }
}
