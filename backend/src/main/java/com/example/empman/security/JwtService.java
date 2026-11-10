
package com.example.empman.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private static final String SECRET =
        "EMPMAN_SECRET_KEY_CHANGE_THIS_TO_A_LONG_RANDOM_SECRET_2026";

    private static final long EXPIRATION_TIME =
        1000 * 60 * 60 * 8; // 8 hours

    private final SecretKey key = Keys.hmacShaKeyFor(
        SECRET.getBytes(StandardCharsets.UTF_8)
    );

    public String generateToken(Long employeeId, String designation) {

        return Jwts.builder()
            .subject(employeeId.toString())
            .claim("designation", designation)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(key)
            .compact();
    }

    public Claims extractAllClaims(String token) {

        return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public Long extractEmployeeId(String token) {
        return Long.parseLong(
            extractAllClaims(token).getSubject()
        );
    }

    public String extractDesignation(String token) {
        return extractAllClaims(token).get("designation", String.class);
    }

    public boolean isTokenValid(String token) {

        try {
            extractAllClaims(token);
            return true;
        } catch (Exception exception) {
            return false;
        }
    }
}
