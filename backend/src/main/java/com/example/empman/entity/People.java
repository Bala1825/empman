
package com.example.empman.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

@Entity
@Table(name = "people")
public class People {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Optional connection to a registered login account
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", unique = true)
    private Employee employeeAccount;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String designation;

    private String phone;

    private String department;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    // Optional reporting manager
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporting_to")
    private People reportingTo;

    private String status = "Active";

    public People() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployeeAccount() {
        return employeeAccount;
    }

    public void setEmployeeAccount(Employee employeeAccount) {
        this.employeeAccount = employeeAccount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public People getReportingTo() {
        return reportingTo;
    }

    public void setReportingTo(People reportingTo) {
        this.reportingTo = reportingTo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
