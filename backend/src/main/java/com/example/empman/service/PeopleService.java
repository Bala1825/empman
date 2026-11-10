
package com.example.empman.service;

import com.example.empman.dto.request.PeopleRequest;
import com.example.empman.dto.response.PeopleResponse;
import com.example.empman.entity.Employee;
import com.example.empman.entity.People;
import com.example.empman.repository.EmployeeRepository;
import com.example.empman.repository.PeopleRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PeopleService {

    private final PeopleRepository peopleRepository;
    private final EmployeeRepository employeeRepository;

    public PeopleService(
            PeopleRepository peopleRepository,
            EmployeeRepository employeeRepository) {
        this.peopleRepository = peopleRepository;
        this.employeeRepository = employeeRepository;
    }

    // Get all people
    public List<PeopleResponse> getAllPeople() {
        return peopleRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Get person by ID
    public PeopleResponse getPersonById(Long id) {
        People person = findPerson(id);
        return convertToResponse(person);
    }

    // Add person
    public PeopleResponse addPerson(PeopleRequest request) {

        if (peopleRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists in People");
        }

        People person = new People();
        updatePersonFields(person, request);

        People savedPerson = peopleRepository.save(person);

        return convertToResponse(savedPerson);
    }

    // Update person
    public PeopleResponse updatePerson(Long id, PeopleRequest request) {

        People person = findPerson(id);

        if (peopleRepository.existsByEmailAndIdNot(
                request.getEmail(), id)) {
            throw new RuntimeException("Email already exists in People");
        }

        updatePersonFields(person, request);

        People updatedPerson = peopleRepository.save(person);

        return convertToResponse(updatedPerson);
    }

    // Delete person
    public void deletePerson(Long id) {
        People person = findPerson(id);
        peopleRepository.delete(person);
    }

    // Find person
    private People findPerson(Long id) {
        return peopleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Person not found"));
    }

    // Update fields
    private void updatePersonFields(
            People person,
            PeopleRequest request) {

        person.setName(request.getName());
        person.setEmail(request.getEmail());
        person.setDesignation(request.getDesignation());
        person.setPhone(request.getPhone());
        person.setDepartment(request.getDepartment());
        person.setJoiningDate(request.getJoiningDate());

        person.setStatus(
                request.getStatus() == null ||
                request.getStatus().isBlank()
                        ? "Active"
                        : request.getStatus()
        );

        // Optional login account connection
        if (request.getEmployeeId() != null) {
            Employee employee = employeeRepository
                    .findById(request.getEmployeeId())
                    .orElseThrow(() ->
                            new RuntimeException("Employee account not found"));

            person.setEmployeeAccount(employee);
        } else {
            person.setEmployeeAccount(null);
        }

        // Optional reporting manager
        if (request.getReportingToId() != null) {

            if (person.getId() != null &&
                    person.getId().equals(request.getReportingToId())) {
                throw new RuntimeException(
                        "An employee cannot report to themselves");
            }

            People manager = findPerson(request.getReportingToId());
            person.setReportingTo(manager);

        } else {
            person.setReportingTo(null);
        }
    }

    // Convert entity to response DTO
    private PeopleResponse convertToResponse(People person) {

        Long employeeId = person.getEmployeeAccount() != null
                ? person.getEmployeeAccount().getId()
                : null;

        Long managerId = person.getReportingTo() != null
                ? person.getReportingTo().getId()
                : null;

        String managerName = person.getReportingTo() != null
                ? person.getReportingTo().getName()
                : null;

        return new PeopleResponse(
                person.getId(),
                employeeId,
                person.getName(),
                person.getEmail(),
                person.getDesignation(),
                person.getPhone(),
                person.getDepartment(),
                person.getJoiningDate(),
                managerId,
                managerName,
                person.getStatus()
        );
    }
}
