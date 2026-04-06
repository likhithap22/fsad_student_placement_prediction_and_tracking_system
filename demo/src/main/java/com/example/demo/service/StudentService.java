package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    // ✅ Get all students
    public List<Student> getAll() {
        return repo.findAll();
    }

    // ✅ Save student (with basic validation)
    public Student save(Student s) {
        if (s.getName() == null || s.getName().isEmpty()) {
            throw new RuntimeException("Name cannot be empty");
        }
        return repo.save(s);
    }

    // ✅ Delete safely (avoids crash if ID not found)
    public void delete(Long id) {
        Optional<Student> student = repo.findById(id);
        if (student.isPresent()) {
            repo.deleteById(id);
        } else {
            throw new RuntimeException("Student not found with id: " + id);
        }
    }
}