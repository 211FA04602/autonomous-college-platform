plugins { alias(libs.plugins.springBoot) }

tasks.named<org.springframework.boot.gradle.tasks.run.BootRun>("bootRun") {
    // Pin the JVM's default TimeZone to UTC instead of inheriting the host OS's zone — see
    // the matching comment on the root `tasks.withType<Test>()` block for why.
    jvmArgs("-Duser.timezone=UTC")
}

description = "Composition root: wires all modules, application.yml, Flyway migration " +
    "location aggregation, the health vertical slice, and the ArchUnit boundary tests."

val integrationTest =
    sourceSets.create("integrationTest") {
        java.srcDir("src/integrationTest/java")
        resources.srcDir("src/integrationTest/resources")
        compileClasspath += sourceSets.main.get().output + sourceSets.test.get().output
        runtimeClasspath += sourceSets.main.get().output + sourceSets.test.get().output
    }

configurations["integrationTestImplementation"].extendsFrom(configurations["testImplementation"])
configurations["integrationTestRuntimeOnly"].extendsFrom(configurations["testRuntimeOnly"])

dependencies {
    implementation(project(":platform-core"))
    implementation(project(":identity-access"))
    implementation(project(":tenancy-organization"))
    implementation(project(":audit"))
    implementation(project(":workflow"))
    implementation(project(":documents"))
    implementation(project(":notifications"))
    implementation(project(":integration-outbox"))

    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.flywaydb:flyway-database-postgresql")
    runtimeOnly("org.postgresql:postgresql")
    implementation(libs.springdocOpenapiWebmvcUi)

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation(libs.archunitJunit5)

    "integrationTestImplementation"(libs.testcontainersPostgresql)
    "integrationTestImplementation"(libs.testcontainersJunitJupiter)
}

// Testcontainers-backed tests require Docker, which is not available in every
// environment this build runs in. They live in their own source set/task and are
// never part of the default build/check lifecycle — run explicitly with
// `./gradlew integrationTest` on a machine with Docker available.
tasks.register<Test>("integrationTest") {
    description = "Runs Testcontainers-backed integration tests. Requires Docker. Not part of build/check."
    group = "verification"
    testClassesDirs = integrationTest.output.classesDirs
    classpath = integrationTest.runtimeClasspath
    useJUnitPlatform()
    shouldRunAfter(tasks.named("test"))
}
