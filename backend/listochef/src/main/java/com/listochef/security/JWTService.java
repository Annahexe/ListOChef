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

/**
 * Service responsible for JWT (JSON Web Token) operations.
 *
 * This class handles:
 * - Token generation
 * - Claim extraction (email, role, expiration, etc.)
 * - Token validation
 * - Signature verification
 */
@Service
public class JWTService {

    @Value("${jwt.secret}")
    private String SECRET;

    @Value("${jwt.expiration}")
    private Long expiration;

    /**
     * Generates the signing key used to sign and verify JWT tokens.
     *
     * @return SecretKey used for HMAC SHA signing.
     */
    private SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    /**
     * Generates a JWT token for a given user.
     *
     * The token includes:
     * - Subject (email)
     * - Role claim
     * - Issued date
     * - Expiration date
     *
     * @param email User email (stored as subject).
     * @param role User role.
     * @return Generated JWT token as String.
     */
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignKey())
                .compact();
    }

    /**
     * Extracts the email (subject) from a JWT token.
     *
     * @param token JWT token.
     * @return Email stored in the token.
     */
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts the expiration date from a JWT token.
     *
     * @param token JWT token.
     * @return Expiration date.
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extracts the role claim from a JWT token.
     *
     * @param token JWT token.
     * @return Role stored in the token.
     */
    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    /**
     * Generic method to extract any claim from a JWT token.
     *
     * @param token JWT token.
     * @param claimsResolver Function used to extract a specific claim.
     * @param <T> Type of the claim.
     * @return Extracted claim value.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Parses and retrieves all claims from a JWT token.
     *
     * This method also verifies the token signature.
     *
     * @param token JWT token.
     * @return Claims object containing token data.
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Checks if a token has expired.
     *
     * @param token JWT token.
     * @return true if expired, false otherwise.
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Validates a JWT token.
     *
     * Validation includes:
     * - Matching email (subject)
     * - Checking expiration
     *
     * @param token JWT token.
     * @param email Expected user email.
     * @return true if token is valid, false otherwise.
     */
    public Boolean validateToken(String token, String email) {
        final String tokenEmail = extractEmail(token);
        return (tokenEmail.equals(email) && !isTokenExpired(token));
    }
}