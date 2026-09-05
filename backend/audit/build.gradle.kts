// audit: audit trail primitives for high-risk actions (constitution rules 7, 9).

dependencies {
    implementation(project(":platform-core"))
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
