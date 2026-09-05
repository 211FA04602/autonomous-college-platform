// notifications: NOT implemented in this foundation prompt beyond an empty, compiling
// module skeleton. Depends on integration-outbox already (per
// docs/architecture/MODULE_BOUNDARIES.md) so the module graph edge exists even though
// nothing consumes outbox events yet. See README.md.

dependencies {
    implementation(project(":platform-core"))
    implementation(project(":integration-outbox"))

    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
