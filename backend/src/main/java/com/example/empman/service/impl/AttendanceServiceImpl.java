
package com.example.empman.service.impl;

import com.example.empman.entity.Attendance;
import com.example.empman.repository.AttendanceRepository;
import com.example.empman.service.AttendanceService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;

    // Constructor injection
    public AttendanceServiceImpl(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @Override
    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @Override
    @Transactional(readOnly = true)
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
    public void deleteAttendance(Long id) {

        if (!attendanceRepository.existsById(id)) {
            throw new EntityNotFoundException(
                    "Attendance record not found with ID: " + id
            );
        }

        attendanceRepository.deleteById(id);
    }
}
