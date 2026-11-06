
package com.example.empman.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

public class AttendanceResponse {

    private Long id;
    private Long employeeId;
    private LocalDate attendanceDate;
    private String entryType;
    private LocalTime entryTime;

    public AttendanceResponse() {
    }

    public AttendanceResponse(
            Long id,
            Long employeeId,
            LocalDate attendanceDate,
            String entryType,
            LocalTime entryTime) {

        this.id = id;
        this.employeeId = employeeId;
        this.attendanceDate = attendanceDate;
        this.entryType = entryType;
        this.entryTime = entryTime;
    }

    public Long getId() {
        return id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public LocalDate getAttendanceDate() {
        return attendanceDate;
    }

    public String getEntryType() {
        return entryType;
    }

    public LocalTime getEntryTime() {
        return entryTime;
    }
}
