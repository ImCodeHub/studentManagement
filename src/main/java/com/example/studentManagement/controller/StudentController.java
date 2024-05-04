package com.example.studentManagement.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.studentManagement.Entity.Student;
import com.example.studentManagement.Service.StudentService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class StudentController {
	@Autowired
	private StudentService studentService;

	@GetMapping("/studentList")
	public List<Student> getListOfStudent() {
		return studentService.getAllStudents();
		
	}

	@PostMapping("/addStudent")
	public ResponseEntity<Student> addStudent(@RequestBody Student student) {
		Student newStudent = studentService.addStudent(student);
		return new ResponseEntity<>(newStudent, HttpStatus.CREATED);
	}

	@PutMapping("/updateStudent/{id}")
	public ResponseEntity<String> updateStudent(@PathVariable Long id, @RequestBody Student student) {
		try {
			// call the service to update in the database
			Student updated = studentService.updateStudent(id, student);
			if (updated == null) {
				return new ResponseEntity<>("student not found", HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>("updated", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error updating student: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@CrossOrigin
	@DeleteMapping("/deleteStudent/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
		boolean deleted = studentService.deleteStudent(id);
		if (deleted) {
			return new ResponseEntity<>("student deleted successfully", HttpStatus.OK);
		} else {
			// Handle the case where the student with the given ID doesn't exist
			return new ResponseEntity<>("student not found", HttpStatus.NOT_FOUND);
		}
	}
}