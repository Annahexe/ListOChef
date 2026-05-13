package com.listochef.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.listochef.security.JWTAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

/**
 * Security configuration class for the application.
 *
 * This class defines the Spring Security filter chain, including: - JWT
 * authentication filter - Public and protected endpoints - Stateless session
 * management - Method-level security support
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	@Autowired
	private JWTAuthenticationFilter jwtAuthFilter;

	/**
	 * Configures the security filter chain for HTTP requests.
	 *
	 * This method defines: - CSRF disabled for stateless API usage - Public
	 * endpoints (login, register, password recovery) - Authentication required for
	 * all other endpoints - Stateless session management using JWT - JWT filter
	 * integration before UsernamePasswordAuthenticationFilter
	 *
	 * @param http HttpSecurity configuration object
	 * @return Configured SecurityFilterChain
	 * @throws Exception If security configuration fails
	 */
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http.cors().and()
	        .csrf().disable()
	        .authorizeRequests()
	            .antMatchers("/ListOChef/login").permitAll()
	            .antMatchers("/ListOChef/register").permitAll()
	            .antMatchers("/ListOChef/forgotPassword").permitAll()
	            .antMatchers("/ListOChef/resetPassword").permitAll()
	            .anyRequest().authenticated()
	        .and()
	        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        .and()
	        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
	    return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration config = new CorsConfiguration();
	    config.setAllowedOrigins(List.of("*"));
	    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    config.setAllowedHeaders(List.of("*"));
	    
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config);
	    return source;
	}
	
	
}