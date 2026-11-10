
package com.example.empman.controller;

import com.example.empman.dto.request.PeopleRequest;
import com.example.empman.dto.response.PeopleResponse;
import com.example.empman.service.PeopleService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/people")
@CrossOrigin(origins = "http://localhost:5173")
public class PeopleController {

    private final PeopleService peopleService;

    public PeopleController(PeopleService peopleService) {
        this.peopleService = peopleService;
    }

    // Get all people
    @GetMapping
    public List<PeopleResponse> getAllPeople() {
        return peopleService.getAllPeople();
    }

    // Get person by ID
    @GetMapping("/{id}")
    public PeopleResponse getPersonById(@PathVariable Long id) {
        return peopleService.getPersonById(id);
    }

    // Add person
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PeopleResponse addPerson(
            @Valid @RequestBody PeopleRequest request) {
        return peopleService.addPerson(request);
    }

    // Update person
    @PutMapping("/{id}")
    public PeopleResponse updatePerson(
            @PathVariable Long id,
            @Valid @RequestBody PeopleRequest request) {
        return peopleService.updatePerson(id, request);
    }

    // Delete person
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePerson(@PathVariable Long id) {
        peopleService.deletePerson(id);
    }
}
