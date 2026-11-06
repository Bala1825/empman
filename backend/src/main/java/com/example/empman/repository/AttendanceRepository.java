
package com.example.empman.repository;

import com.example.empman.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByEmployeeIdAndAttendanceDateOrderByEntryTimeAsc(
            Long employeeId,
            LocalDate attendanceDate
    );
}
