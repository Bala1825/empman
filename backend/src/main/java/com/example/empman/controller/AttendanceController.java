
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AttendanceResponse saveAttendance(
            @Valid @RequestBody AttendanceRequest request) {

        Attendance attendance = attendanceMapper.toEntity(request);

        Attendance savedAttendance =
                attendanceService.saveAttendance(attendance);

        return attendanceMapper.toResponse(savedAttendance);
    }


    @GetMapping
    public List<AttendanceResponse> getAttendance(
            @RequestParam Long employeeId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date) {

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
    
        attendanceService.deleteAttendance(id);
    }
}
