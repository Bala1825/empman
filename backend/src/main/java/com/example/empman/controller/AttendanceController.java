
package com.example.empman.controller;

import com.example.empman.dto.request.AttendanceRequest;
import com.example.empman.dto.response.AttendanceResponse;
import com.example.empman.entity.Attendance;
import com.example.empman.mapper.AttendanceMapper;
import com.example.empman.service.AttendanceService;


import jakarta.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    private final AttendanceService attendanceService;
    private final AttendanceMapper attendanceMapper;

    public AttendanceController(
            AttendanceService attendanceService,
            AttendanceMapper attendanceMapper) {

        this.attendanceService = attendanceService;
        this.attendanceMapper = attendanceMapper;
    }
    
    private Long getLoggedInEmployeeId(){
        return Long.parseLong(
            SecurityContextHolder.getContext()
                .getAuthentication()
                .getName()
        );
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AttendanceResponse saveAttendance(
            @Valid @RequestBody AttendanceRequest request) {
        
        Long employeeId = getLoggedInEmployeeId();

        Attendance attendance = attendanceMapper.toEntity(request);

        Attendance savedAttendance =
                attendanceService.saveAttendance(employeeId, attendance);

        return attendanceMapper.toResponse(savedAttendance);
    }


    @GetMapping
    public List<AttendanceResponse> getAttendance(
    
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {
        
        Long employeeId =  getLoggedInEmployeeId();

        List<Attendance> attendanceList =
                attendanceService.getAttendanceByEmployeeAndDate(
                        employeeId, date);

        return attendanceList.stream()
                .map(attendanceMapper::toResponse)
                .toList();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAttendance(@PathVariable Long id) {

        Long employeeId = getLoggedInEmployeeId();
    
        attendanceService.deleteAttendance(employeeId, id);
    }

}
