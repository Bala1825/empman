
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

    public AttendanceServiceImpl(
            AttendanceRepository attendanceRepository) {

        this.attendanceRepository = attendanceRepository;
    }

    @Override
    public Attendance saveAttendance(
            Long employeeId,
            Attendance attendance) {

        attendance.setId(null);
        attendance.setEmployeeId(employeeId);

        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getAttendance(Long employeeId) {

        return attendanceRepository
                .findByEmployeeIdOrderByAttendanceDateDescEntryTimeAsc(
                        employeeId
                );
    }

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

    @Override
    public void deleteAttendance(Long employeeId, Long id) {

        Attendance attendance = attendanceRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Attendance record not found"
                ));

        if (!attendance.getEmployeeId().equals(employeeId)) {
            throw new RuntimeException(
                    "You are not authorized to delete this attendance"
            );
        }

        attendanceRepository.delete(attendance);
    }
}
