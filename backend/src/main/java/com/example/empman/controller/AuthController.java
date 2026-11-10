
package com.example.empman.controller;

import com.example.empman.dto.request.LoginRequest;
import com.example.empman.dto.request.RegisterRequest;
import com.example.empman.entity.Employee;
import com.example.empman.service.AuthService;
import com.example.empman.security.JwtService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(
            AuthService authService,
            JwtService jwtService) {

        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request) {

        Employee employee = authService.register(request);

        Map<String, Object> response = Map.of(
            "message", "Registration successful",
            "id", employee.getId(),
            "name", employee.getName(),
            "email", employee.getEmail(),
            "designation", employee.getDesignation()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request) {

        Employee employee = authService.login(request);

        String token = jwtService.generateToken(
            employee.getId(),
            employee.getDesignation()
        );

        Map<String, Object> response = Map.of(
            "message", "Login successful",
            "token", token,
            "id", employee.getId(),
            "name", employee.getName(),
            "email", employee.getEmail(),
            "designation", employee.getDesignation()
        );

        return ResponseEntity.ok(response);
    }
}
