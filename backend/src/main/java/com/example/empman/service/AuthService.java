
package com.example.empman.service;

import com.example.empman.dto.request.RegisterRequest;
import com.example.empman.dto.request.LoginRequest;
import com.example.empman.entity.Employee;
import com.example.empman.repository.EmployeeRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            EmployeeRepository employeeRepository,
            PasswordEncoder passwordEncoder) {

        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Employee register(RegisterRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        if (employeeRepository.existsByEmail(email)) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Email already registered"
            );
        }

        Employee employee = new Employee();

        employee.setName(request.getName().trim());
        employee.setEmail(email);

        employee.setPassword(
            passwordEncoder.encode(request.getPassword())
        );

        employee.setDesignation(request.getDesignation());

        return employeeRepository.save(employee);
    }

    public Employee login(LoginRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        Employee employee = employeeRepository
            .findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
            ));

        if (!passwordEncoder.matches(
                request.getPassword(),
                employee.getPassword())) {

            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
            );
        }

        return employee;
    }
}
