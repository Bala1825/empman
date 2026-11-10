
package com.example.empman.controller;

import com.example.empman.entity.Employee;
import com.example.empman.dto.response.EmployeeResponse;
import com.example.empman.service.EmployeeService;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    private EmployeeResponse convertToResponse(Employee employee) {
        return new EmployeeResponse(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getDesignation()
        );
    }

    @GetMapping
    public List<EmployeeResponse> getAllEmployees() {
        return employeeService.getAllEmployees()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public EmployeeResponse getEmployeeById(@PathVariable Long id) {
        return convertToResponse(employeeService.getEmployeeById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeResponse addEmployee(@RequestBody Employee employee) {
        return convertToResponse(employeeService.addEmployee(employee));
    }

    @PutMapping("/{id}")
    public EmployeeResponse updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employee) {
        return convertToResponse(
                employeeService.updateEmployee(id, employee)
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }
}
