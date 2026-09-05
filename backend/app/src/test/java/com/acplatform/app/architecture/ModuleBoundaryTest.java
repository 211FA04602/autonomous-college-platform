package com.acplatform.app.architecture;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.classes;
import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.base.DescribedPredicate;
import com.tngtech.archunit.core.domain.JavaClass;
import com.tngtech.archunit.core.importer.ImportOption;
import com.tngtech.archunit.junit.AnalyzeClasses;
import com.tngtech.archunit.junit.ArchTest;
import com.tngtech.archunit.lang.ArchCondition;
import com.tngtech.archunit.lang.ArchRule;
import com.tngtech.archunit.lang.ConditionEvents;
import com.tngtech.archunit.lang.SimpleConditionEvent;
import com.tngtech.archunit.library.dependencies.SlicesRuleDefinition;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

/**
 * Enforces the module boundary rules in docs/architecture/MODULE_BOUNDARIES.md. Every module must
 * be on this test's classpath, which is why {@code app} — the composition root that depends on
 * every module — is where this test lives.
 */
@AnalyzeClasses(packages = "com.acplatform", importOptions = ImportOption.DoNotIncludeTests.class)
class ModuleBoundaryTest {

  private static final String BASE_PACKAGE = "com.acplatform";
  private static final Pattern MODULE_PATTERN =
      Pattern.compile("^com\\.acplatform\\.([a-zA-Z0-9]+)(?:\\..*)?$");
  private static final String SHARED_KERNEL_MODULE = "platformcore";

  /** Rule 1: the module dependency graph must be a DAG — no cycles between modules. */
  @ArchTest
  static final ArchRule modules_are_free_of_cycles =
      SlicesRuleDefinition.slices().matching(BASE_PACKAGE + ".(*)..").should().beFreeOfCycles();

  /**
   * Rule 2: a module's classes outside its {@code ...api} subpackage are invisible to every other
   * module's classes. {@code platform-core} is exempt — every module may depend on it in full,
   * since it is the shared kernel, not a domain module.
   */
  @ArchTest
  static final ArchRule modules_only_reach_other_modules_through_api_packages =
      classes()
          .that()
          .resideInAPackage(BASE_PACKAGE + "..")
          .should(onlyDependOnOtherModulesThroughApiPackages());

  /**
   * Rule 3: {@code platform-core} — the shared kernel — never depends on any other module. The
   * dependency arrow only ever points into it, never out of it.
   */
  @ArchTest
  static final ArchRule platform_core_has_no_dependency_on_other_modules =
      noClasses()
          .that()
          .resideInAPackage(BASE_PACKAGE + "." + SHARED_KERNEL_MODULE + "..")
          .should()
          .dependOnClassesThat(belongsToAnyModuleOtherThan(SHARED_KERNEL_MODULE));

  /**
   * Rule 5 (docs/architecture/MODULE_BOUNDARIES.md): repositories over tenant-owned entities must
   * expose no unscoped "find all" method (constitution rule 4).
   *
   * <p>Deliberately disabled rather than faked: no tenant-owned entity exists anywhere in this
   * codebase yet (tenancy-organization is an empty skeleton — see its README.md), so there is
   * nothing for this rule to check today. It activates the moment the first tenant-owned
   * entity/repository ships; do not delete this test, replace its body with a real check at that
   * point.
   */
  @Disabled(
      "Activates once the first tenant-owned entity ships (tenancy-organization is "
          + "still an empty skeleton in this foundation prompt). See constitution rule 4 "
          + "and MODULE_BOUNDARIES.md rule 5.")
  @Test
  void repositories_over_tenant_owned_entities_expose_no_unscoped_find_all() {
    // Intentionally empty placeholder — see the @Disabled reason above.
  }

  private static ArchCondition<JavaClass> onlyDependOnOtherModulesThroughApiPackages() {
    return new ArchCondition<>("only depend on other modules' `api` packages") {
      @Override
      public void check(JavaClass javaClass, ConditionEvents events) {
        String ownModule = moduleOf(javaClass.getPackageName());
        javaClass
            .getDirectDependenciesFromSelf()
            .forEach(
                dependency -> {
                  JavaClass target = dependency.getTargetClass();
                  String targetModule = moduleOf(target.getPackageName());
                  if (targetModule == null
                      || targetModule.equals(ownModule)
                      || targetModule.equals(SHARED_KERNEL_MODULE)) {
                    return;
                  }
                  String apiPackagePrefix = BASE_PACKAGE + "." + targetModule + ".api";
                  boolean targetIsApi =
                      target.getPackageName().equals(apiPackagePrefix)
                          || target.getPackageName().startsWith(apiPackagePrefix + ".");
                  if (!targetIsApi) {
                    events.add(
                        SimpleConditionEvent.violated(
                            javaClass,
                            "Class <%s> in module '%s' depends on non-api class <%s> in module '%s'"
                                .formatted(
                                    javaClass.getFullName(),
                                    ownModule,
                                    target.getFullName(),
                                    targetModule)));
                  }
                });
      }
    };
  }

  private static DescribedPredicate<JavaClass> belongsToAnyModuleOtherThan(String excludedModule) {
    return new DescribedPredicate<>(
        "resides in a com.acplatform module other than '" + excludedModule + "'") {
      @Override
      public boolean test(JavaClass javaClass) {
        String module = moduleOf(javaClass.getPackageName());
        return module != null && !module.equals(excludedModule);
      }
    };
  }

  /** Returns the module segment right after {@code com.acplatform.}, or null if not one of ours. */
  private static String moduleOf(String packageName) {
    Matcher matcher = MODULE_PATTERN.matcher(packageName);
    return matcher.matches() ? matcher.group(1) : null;
  }
}
