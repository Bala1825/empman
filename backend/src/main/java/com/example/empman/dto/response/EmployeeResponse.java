
package com.example.empman.dto.response;

public class EmployeeResponse {

    private Long id;
    private String name;
    private String email;
    private String designation;

    public EmployeeResponse() {
    }

    public EmployeeResponse(Long id, String name, String email, String designation) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.designation = designation;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getDesignation() {
        return designation;
    }
}
