package com.acplatform.app.integration;

import static org.assertj.core.api.Assertions.assertThat;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

/**
 * Verifies every module's Flyway migrations apply cleanly against a real PostgreSQL 17 instance and
 * create the expected tables. Requires Docker.
 *
 * <p><strong>Not part of the default build/check lifecycle.</strong> Run explicitly with: {@code
 * ./gradlew :app:integrationTest} (requires Docker to be running). This test was NOT executed in
 * the sandbox this foundation prompt was built in — no Docker was available there; see
 * backend/README.md, "What could not be verified here".
 */
@Testcontainers
class FlywayMigrationIntegrationTest {

  @Container
  private static final PostgreSQLContainer<?> POSTGRES =
      new PostgreSQLContainer<>("postgres:17").withDatabaseName("acplatform_it");

  @Test
  void appliesAllModuleMigrationsAndCreatesExpectedTables() throws Exception {
    Flyway flyway =
        Flyway.configure()
            .dataSource(POSTGRES.getJdbcUrl(), POSTGRES.getUsername(), POSTGRES.getPassword())
            .locations("classpath:db/migration/audit", "classpath:db/migration/outbox")
            .load();

    flyway.migrate();

    try (Connection connection =
            DriverManager.getConnection(
                POSTGRES.getJdbcUrl(), POSTGRES.getUsername(), POSTGRES.getPassword());
        Statement statement = connection.createStatement()) {
      assertThat(tableExists(statement, "audit_log")).isTrue();
      assertThat(tableExists(statement, "outbox_event")).isTrue();
    }
  }

  private static boolean tableExists(Statement statement, String tableName) throws Exception {
    try (ResultSet resultSet =
        statement.executeQuery(
            "SELECT to_regclass('public." + tableName + "') IS NOT NULL AS exists")) {
      resultSet.next();
      return resultSet.getBoolean("exists");
    }
  }
}
