package com.acplatform.app.config;

import com.acplatform.platformcore.id.IdGenerator;
import com.acplatform.platformcore.web.CorrelationIdFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

/**
 * The composition root owns registering platform-core's correlation-id filter — its bean
 * registration, ordering, and URL pattern — per docs/architecture/MODULE_BOUNDARIES.md.
 */
@Configuration
public class WebFilterConfig {

  @Bean
  public FilterRegistrationBean<CorrelationIdFilter> correlationIdFilter(IdGenerator idGenerator) {
    FilterRegistrationBean<CorrelationIdFilter> registration = new FilterRegistrationBean<>();
    registration.setFilter(new CorrelationIdFilter(idGenerator));
    registration.addUrlPatterns("/*");
    registration.setOrder(Ordered.HIGHEST_PRECEDENCE);
    registration.setName("correlationIdFilter");
    return registration;
  }
}
