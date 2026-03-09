package com.listochef.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

@Service
public class JWTService {

    @Value("${jwt.secret}")
    private String SECRET;
    
    @Value("${jwt.expiration}")
    private Long expiration;
    
    // Genera la clave de firma desde el SECRET
    private SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }
    
    // GENERAR TOKEN
    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)  // Guarda el email
                .issuedAt(new Date())  // Fecha de creación
                .expiration(new Date(System.currentTimeMillis() + expiration))  // Fecha de expiración
                .signWith(getSignKey())  // Firma el token
                .compact();  // Genera el string
    }
    
    // EXTRAER EMAIL DEL TOKEN
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    // EXTRAER FECHA DE EXPIRACIÓN
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    // MÉTODO GENÉRICO PARA EXTRAER CUALQUIER CLAIM
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    // EXTRAER TODOS LOS CLAIMS (datos del token)
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())  // Verifica la firma
                .build()
                .parseSignedClaims(token)  // Lee el token
                .getPayload();  // Devuelve los datos
    }
    
    // VERIFICAR SI EL TOKEN EXPIRÓ
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    // VALIDAR TOKEN
    public Boolean validateToken(String token, String email) {
        final String tokenEmail = extractEmail(token);
        return (tokenEmail.equals(email) && !isTokenExpired(token));
    }

}
