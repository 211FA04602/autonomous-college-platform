rootProject.name = "acplatform-backend"

// gradle/libs.versions.toml is auto-detected by convention as the "libs" version
// catalog — no explicit dependencyResolutionManagement block needed (and adding one
// that also points at the same file trips Gradle 9's "from() called twice" check).

include(
    "platform-core",
    "identity-access",
    "tenancy-organization",
    "audit",
    "workflow",
    "documents",
    "notifications",
    "integration-outbox",
    "app",
)
