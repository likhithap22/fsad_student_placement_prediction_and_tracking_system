package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String roll;

    private int aptitude;
    private int mentorpick;
    private int codechef;
    private int leetcode;

    @Column(name = "student_rank")
    private int studentRank;

    private double total;
    private double chance;

    // GETTERS & SETTERS

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRoll() { return roll; }
    public void setRoll(String roll) { this.roll = roll; }

    public int getAptitude() { return aptitude; }
    public void setAptitude(int aptitude) { this.aptitude = aptitude; }

    public int getMentorpick() { return mentorpick; }
    public void setMentorpick(int mentorpick) { this.mentorpick = mentorpick; }

    public int getCodechef() { return codechef; }
    public void setCodechef(int codechef) { this.codechef = codechef; }

    public int getLeetcode() { return leetcode; }
    public void setLeetcode(int leetcode) { this.leetcode = leetcode; }

    public int getStudentRank() { return studentRank; }
    public void setStudentRank(int studentRank) { this.studentRank = studentRank; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public double getChance() { return chance; }
    public void setChance(double chance) { this.chance = chance; }
}