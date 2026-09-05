package com.acplatform.app.config;

import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Permissive CORS for local web/native-mobile-dev-tooling origins ONLY. This configuration is only
 * ever active under the {@code local} or {@code dev} Spring profiles — it must never be enabled in
 * a shared/staging/production environment.
 *
 * <p>Origins covered: the Vite web dev server, on every loopback form a browser may pick for it
 * ({@code http://localhost:5173}, {@code http://127.0.0.1:5173}, {@code http://[::1]:5173}), the
 * React Native Metro bundler ({@code http://localhost:8081}), the Android emulator's
 * loopback-to-host address ({@code http://10.0.2.2:8081}), and Expo Go ({@code
 * exp://127.0.0.1:19000}).
 */
@Configuration
@Profile({"local", "dev"})
public class LocalDevCorsConfig implements WebMvcConfigurer {

  private static final List<String> DEV_ORIGINS =
      List.of(
          "http://localhost:5173",
          "http://127.0.0.1:5173",
          "http://[::1]:5173",
          "http://localhost:8081",
          "http://10.0.2.2:8081",
          "exp://127.0.0.1:19000");

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
        .addMapping("/**")
        .allowedOrigins(DEV_ORIGINS.toArray(new String[0]))
        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true);
  }
}
