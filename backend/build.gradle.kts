import com.diffplug.gradle.spotless.SpotlessExtension
import io.spring.gradle.dependencymanagement.dsl.DependencyManagementExtension

plugins {
    java
    alias(libs.plugins.springBoot) apply false
    alias(libs.plugins.springDependencyManagement) apply false
    alias(libs.plugins.spotless) apply false
}

// Captured here (root project scope, where the generated `libs` accessor is known to
// resolve correctly) as plain values, then closed over below — referencing `libs`
// directly from inside the `subprojects { }` lambda resolves it against whichever
// child project is being configured at the time, which does not have the catalog
// registered as a project extension and fails at runtime.
val javaVersion = libs.versions.java.get()
val springBootVersion = libs.versions.springBoot.get()
val googleJavaFormatVersion = libs.versions.googleJavaFormat.get()

allprojects {
    group = "com.acplatform"
    version = "0.1.0-SNAPSHOT"

    repositories {
        mavenCentral()
    }
}

subprojects {
    apply(plugin = "java-library")
    apply(plugin = "io.spring.dependency-management")
    apply(plugin = "com.diffplug.spotless")

    extensions.configure<JavaPluginExtension> {
        toolchain { languageVersion.set(JavaLanguageVersion.of(javaVersion.toInt())) }
    }

    // Every module's dependency versions for Spring-provided libraries (spring-web,
    // spring-boot-starter-*, flyway, postgresql driver, etc.) are aligned through the
    // Spring Boot BOM, even for library modules that never apply the
    // org.springframework.boot plugin itself (see ADR-003).
    extensions.configure<DependencyManagementExtension> {
        imports { mavenBom("org.springframework.boot:spring-boot-dependencies:$springBootVersion") }
    }

    extensions.configure<SpotlessExtension> {
        java {
            target("src/**/*.java")
            targetExclude("**/build/**", "**/generated/**")
            googleJavaFormat(googleJavaFormatVersion)
        }
        kotlinGradle {
            target("*.gradle.kts")
        }
    }

    tasks.withType<Test>().configureEach { useJUnitPlatform() }

    // The org.springframework.boot Gradle plugin normally adds this automatically
    // wherever spring-boot-starter-test is used; library modules here don't apply that
    // plugin (only `app` does), so every module needs it added explicitly or JUnit 5's
    // test executor cannot start (Gradle 9 requires the platform launcher on the test
    // runtime classpath).
    dependencies {
        add("testRuntimeOnly", "org.junit.platform:junit-platform-launcher")
    }

    tasks.withType<JavaCompile>().configureEach {
        options.encoding = "UTF-8"
        options.compilerArgs.add("-parameters")
    }
}
