// integration-outbox: transactional outbox table + publication contract (ADR-004).
// No relay/consumer or message-broker client is implemented yet — deferred per ADR-004
// until a real consumer needs it. See README.md.

dependencies {
    implementation(project(":platform-core"))
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
