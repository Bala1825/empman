
package com.example.empman.service.impl;

import com.example.empman.entity.Attendance;
import com.example.empman.repository.AttendanceRepository;
import com.example.empman.service.AttendanceService;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;

    // Constructor injection
    public AttendanceServiceImpl(
            AttendanceRepository attendanceRepository) {

        this.attendanceRepository = attendanceRepository;
    }

    // Save attendance
    @Override
    public Attendance saveAttendance(Attendance attendance) {

        return attendanceRepository.save(attendance);
    }

    // Retrieve attendance by employee and date
    @Override
    public List<Attendance> getAttendanceByEmployeeAndDate(
            Long employeeId,
            LocalDate attendanceDate) {

        return attendanceRepository
                .findByEmployeeIdAndAttendanceDateOrderByEntryTimeAsc(
                        employeeId,
                        attendanceDate
                );
    }

    // Delete attendance
    @Override
    public void deleteAttendance(String id) {

        if (!attendanceRepository.existsById(id)) {
            throw new RuntimeException(
                    "Attendance record not found with ID: " + id
            );
        }

        attendanceRepository.deleteById(id);
    }
}
