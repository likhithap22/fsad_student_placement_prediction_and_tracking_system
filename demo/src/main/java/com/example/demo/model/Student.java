package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String roll;

    private int leetcodeScore;
    private int codechefScore;
    private int mentorpickScore;
    private int aptitudeScore;

    private int placementChance;
    private String companyLevel;
    private String predictedCompanies;

    // Getters & Setters

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRoll() { return roll; }
    public void setRoll(String roll) { this.roll = roll; }

    public int getLeetcodeScore() { return leetcodeScore; }
    public void setLeetcodeScore(int leetcodeScore) { this.leetcodeScore = leetcodeScore; }

    public int getCodechefScore() { return codechefScore; }
    public void setCodechefScore(int codechefScore) { this.codechefScore = codechefScore; }

    public int getMentorpickScore() { return mentorpickScore; }
    public void setMentorpickScore(int mentorpickScore) { this.mentorpickScore = mentorpickScore; }

    public int getAptitudeScore() { return aptitudeScore; }
    public void setAptitudeScore(int aptitudeScore) { this.aptitudeScore = aptitudeScore; }

    public int getPlacementChance() { return placementChance; }
    public void setPlacementChance(int placementChance) { this.placementChance = placementChance; }

    public String getCompanyLevel() { return companyLevel; }
    public void setCompanyLevel(String companyLevel) { this.companyLevel = companyLevel; }

    public String getPredictedCompanies() { return predictedCompanies; }
    public void setPredictedCompanies(String predictedCompanies) { this.predictedCompanies = predictedCompanies; }
}