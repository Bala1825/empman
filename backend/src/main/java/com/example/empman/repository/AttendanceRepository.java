
package com.example.empman.repository;

import com.example.empman.entity.Attendance;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository
        extends MongoRepository<Attendance, String> {

    List<Attendance> findByEmployeeIdAndAttendanceDateOrderByEntryTimeAsc(
            Long employeeId,
            LocalDate attendanceDate
    );
}
