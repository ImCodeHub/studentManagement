package com.example.studentManagement.Service;

import java.util.List;

import com.example.studentManagement.Entity.Student;

public interface StudentService {
	public List<Student> getAllStudents();
	public Student addStudent(Student student);
	public Student updateStudent(Long id , Student updatedStudent);
	public boolean deleteStudent(Long id);
	
}
