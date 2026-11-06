
package com.example.empman.service;

import com.example.empman.entity.Attendance;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {

    Attendance saveAttendance(Attendance attendance);

    List<Attendance> getAttendanceByEmployeeAndDate(
            Long employeeId,
            LocalDate attendanceDate
    );

    void deleteAttendance(Long id);
}
