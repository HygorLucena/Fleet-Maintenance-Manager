package com.fleetmaintenance.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.*;
import java.util.List;

@Configuration
public class CorsConfig {
    @Bean
    CorsConfigurationSource corsConfigurationSource(@Value("${CORS_ALLOWED_ORIGINS:http://localhost:5173}") String origins) {
        CorsConfiguration config=new CorsConfiguration();
        config.setAllowedOrigins(List.of(origins.split(",")));
        config.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization","Content-Type","Accept"));
        config.setExposedHeaders(List.of("Location"));
        config.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",config);
        return source;
    }
}
