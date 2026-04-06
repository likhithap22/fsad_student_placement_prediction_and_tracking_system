package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    public List<Student> getAll() {
        return repo.findAll();
    }

    public Student save(Student s) {
        return repo.save(s);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    // TEMP SIMPLE PREDICTION (NO PYTHON YET)
    public Student predictOnly(Student s) {

        int avg = (s.getMentorpickScore() +
                   s.getCodechefScore() +
                   s.getLeetcodeScore() +
                   s.getAptitudeScore()) / 4;

        s.setPlacementChance(avg);

        if (avg > 80) {
            s.setCompanyLevel("High");
        } else if (avg > 60) {
            s.setCompanyLevel("Medium");
        } else {
            s.setCompanyLevel("Low");
        }

        return s;
    }
}