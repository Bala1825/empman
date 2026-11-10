
package com.example.empman.service;

import com.example.empman.entity.Employee;
import com.example.empman.repository.EmployeeRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get employee by ID
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    // Add employee
    public Employee addEmployee(Employee employee) {
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        return employeeRepository.save(employee);
    }

    // Update employee
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee employee = getEmployeeById(id);

        employee.setName(updatedEmployee.getName());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setDesignation(updatedEmployee.getDesignation());

        return employeeRepository.save(employee);
    }

    // Delete employee
    public void deleteEmployee(Long id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);
    }
}
