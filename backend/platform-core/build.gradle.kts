// platform-core: shared kernel. Deliberately minimal — no dependency on any
// other module in this repository (see docs/architecture/MODULE_BOUNDARIES.md).
// Spring Web is included only to expose the shared Problem Details advice,
// correlation-id servlet filter, and related building blocks (constitution rule 12).

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation(libs.uuidCreator)

    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
