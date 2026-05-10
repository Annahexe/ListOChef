package com.listochef.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

/**
 * JWT authentication filter that runs once per request.
 *
 * This filter is responsible for:
 * - Extracting the JWT token from the Authorization header
 * - Validating the token
 * - Extracting user identity and role
 * - Setting the Spring Security authentication context
 */
@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    /**
     * Filters each HTTP request to authenticate users based on JWT.
     *
     * Process:
     * - Reads Authorization header
     * - Checks Bearer token format
     * - Extracts JWT token
     * - Validates token and extracts user data
     * - Creates Spring Security authentication object
     * - Sets authentication in SecurityContext
     *
     * If token is missing or invalid, request proceeds without authentication.
     *
     * @param request HTTP request.
     * @param response HTTP response.
     * @param filterChain Filter chain.
     * @throws ServletException If servlet processing fails.
     * @throws IOException If I/O error occurs.
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String jwt = authHeader.substring(7);
            final String userEmail = jwtService.extractEmail(jwt);

            if (userEmail != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

                if (jwtService.validateToken(jwt, userEmail)) {

                    String role = jwtService.extractRole(jwt);

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userEmail,
                                    null,
                                    List.of(
                                        new SimpleGrantedAuthority(
                                            "ROLE_" + role.toUpperCase()
                                        )
                                    )
                            );

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

        } catch (Exception e) {
            System.out.println("Error validating token: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}