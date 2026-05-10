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

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Obtener el header Authorization
        final String authHeader = request.getHeader("Authorization");

        // 2. Si no hay header o no empieza con "Bearer ", continuar sin autenticar
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // 3. Extraer el token (quitar "Bearer ")
            final String jwt = authHeader.substring(7);

            // 4. Extraer el email del token
            final String userEmail = jwtService.extractEmail(jwt);

            // 5. Si hay email y no está ya autenticado
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // 6. Validar el token
                if (jwtService.validateToken(jwt, userEmail)) {

                	String role = jwtService.extractRole(jwt);

                	// 7. Crear la autenticación
                	UsernamePasswordAuthenticationToken authToken =
                	        new UsernamePasswordAuthenticationToken(
                	                userEmail,
                	                null,
                	                List.of(
                	                    new SimpleGrantedAuthority("ROLE_" + role.toUpperCase())
                	                )
                	        );

                    // 8. Marcar como autenticado en Spring Security
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

        } catch (Exception e) {
            // Si hay algún error al validar el token, simplemente no autenticar
            System.out.println("Error validando token: " + e.getMessage());
        }

        // 9. Continuar con la siguiente etapa
        filterChain.doFilter(request, response);
    }
}