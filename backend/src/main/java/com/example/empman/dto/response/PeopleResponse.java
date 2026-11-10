
package com.example.empman.dto.response;

import java.time.LocalDate;

public class PeopleResponse {

    private Long id;
    private Long employeeId;
    private String name;
    private String email;
    private String designation;
    private String phone;
    private String department;
    private LocalDate joiningDate;
    private Long reportingToId;
    private String reportingToName;
    private String status;

    public PeopleResponse(
            Long id,
            Long employeeId,
            String name,
            String email,
            String designation,
            String phone,
            String department,
            LocalDate joiningDate,
            Long reportingToId,
            String reportingToName,
            String status
    ) {
        this.id = id;
        this.employeeId = employeeId;
        this.name = name;
        this.email = email;
        this.designation = designation;
        this.phone = phone;
        this.department = department;
        this.joiningDate = joiningDate;
        this.reportingToId = reportingToId;
        this.reportingToName = reportingToName;
        this.status = status;
    }

    public Long getId() { return id; }
    public Long getEmployeeId() { return employeeId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getDesignation() { return designation; }
    public String getPhone() { return phone; }
    public String getDepartment() { return department; }
    public LocalDate getJoiningDate() { return joiningDate; }
    public Long getReportingToId() { return reportingToId; }
    public String getReportingToName() { return reportingToName; }
    public String getStatus() { return status; }
}
