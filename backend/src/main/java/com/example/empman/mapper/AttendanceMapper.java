
package com.example.empman.mapper;

import com.example.empman.dto.request.AttendanceRequest;
import com.example.empman.dto.response.AttendanceResponse;
import com.example.empman.entity.Attendance;

import org.springframework.stereotype.Component;

@Component
public class AttendanceMapper {

    // Convert Request DTO into MongoDB Document
    public Attendance toEntity(AttendanceRequest request) {

        Attendance attendance = new Attendance();

        attendance.setEmployeeId(request.getEmployeeId());
        attendance.setAttendanceDate(request.getAttendanceDate());
        attendance.setEntryType(request.getEntryType());
        attendance.setEntryTime(request.getEntryTime());

        return attendance;
    }

    // Convert MongoDB Document into Response DTO
    public AttendanceResponse toResponse(Attendance attendance) {

        return new AttendanceResponse(
                attendance.getId(),
                attendance.getEmployeeId(),
                attendance.getAttendanceDate(),
                attendance.getEntryType(),
                attendance.getEntryTime()
        );
    }
}
