package tech.ksergei.bookslibrary.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import tech.ksergei.bookslibrary.entity.Book;
import tech.ksergei.bookslibrary.entity.Message;
import tech.ksergei.bookslibrary.entity.Review;
import tech.ksergei.bookslibrary.env.EnvDevelop;

@Configuration
public class MethodDataRestConfig implements RepositoryRestConfigurer {

  private String clientUrl = EnvDevelop.host;

  @Override
  public void configureRepositoryRestConfiguration(
      RepositoryRestConfiguration config,
      CorsRegistry cors) {

    HttpMethod[] theUnsupportedActions = {
        HttpMethod.POST,
        HttpMethod.DELETE,
        HttpMethod.PUT
    };

    config.exposeIdsFor(Book.class);
    config.exposeIdsFor(Review.class);
    config.exposeIdsFor(Message.class);

    disableHttpMethods(Book.class, config, theUnsupportedActions);
    disableHttpMethods(Review.class, config, theUnsupportedActions);
    disableHttpMethods(Message.class, config, theUnsupportedActions);

    cors.addMapping(config.getBasePath() + "/**")
        .allowedOrigins(clientUrl);
  }

  private void disableHttpMethods(
      Class<?> theClass,
      RepositoryRestConfiguration config,
      HttpMethod[] theUnsupportedActions) {
    config.getExposureConfiguration()
        .forDomainType(theClass)
        .withItemExposure(
            (metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
        .withCollectionExposure(
            (metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
  }
}