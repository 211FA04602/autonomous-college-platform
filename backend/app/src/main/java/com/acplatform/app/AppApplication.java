package com.acplatform.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Composition root. Scans/entity-scans/repository-scans the whole {@code com.acplatform} base
 * package rather than relying on being colocated with every module, since modules live in separate
 * Gradle subprojects (own packages) that this module depends on but never imports internal classes
 * from directly (see docs/architecture/MODULE_BOUNDARIES.md and {@code
 * architecture.ModuleBoundaryTest}).
 *
 * <p>These are classpath/package-name based scans, not source-level imports of other modules'
 * internal classes, so they do not create an ArchUnit-visible cross-module dependency.
 */
@SpringBootApplication(scanBasePackages = "com.acplatform")
@EntityScan(basePackages = "com.acplatform")
@EnableJpaRepositories(basePackages = "com.acplatform")
public class AppApplication {

  public static void main(String[] args) {
    SpringApplication.run(AppApplication.class, args);
  }
}
