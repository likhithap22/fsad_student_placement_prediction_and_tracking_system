package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.demo.model.Student;
import com.example.demo.service.StudentService;

@RestController
@CrossOrigin(origins = "*")   // 🔥 allows your deployed frontend
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    // ✅ Test route
    @GetMapping("/")
    public String home() {
        return "Backend is running 🚀";
    }

    // ✅ Get all students
    @GetMapping
    public List<Student> getAll() {
        return service.getAll();
    }

    // ✅ Save student (IMPORTANT API)
    @PostMapping
    public Student save(@RequestBody Student s) {
        return service.save(s);
    }

    // ✅ Delete student
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}