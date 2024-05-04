package com.example.studentManagement.ServiceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.studentManagement.Entity.Student;
import com.example.studentManagement.Repository.StudentRespository;
import com.example.studentManagement.Service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentRespository studentRespository;

	@Override
	public List<Student> getAllStudents() {
		// return studentRespository.findAll(Sort.by(Sort.Direction.DESC,"id"));
		return studentRespository.findAll(Sort.by("id").descending());
	}

	@Override
	public Student addStudent(Student student) {
		return studentRespository.save(student);

	}

	@Override
	public Student updateStudent(Long id, Student updatedStudent) {
		// checked given id student exist or not.
		Optional<Student> optionalStudent = studentRespository.findById(id);
		if (!optionalStudent.isPresent()) {
			return null;
		}
		// get the existing student
		Student existingStudent = optionalStudent.get();
		// update the student's new properties with the new values
		existingStudent.setStudentName(updatedStudent.getStudentName());
		existingStudent.setMobileNumber(updatedStudent.getMobileNumber());
		existingStudent.setEmail(updatedStudent.getEmail());

		// save the updated student back to the data base
		return studentRespository.save(existingStudent);
	}

	@Override
	public boolean deleteStudent(Long id) {
		Optional<Student> optionalStudent = studentRespository.findById(id);
		if (optionalStudent.isPresent()) {
			// if the student exist, delete it.
			studentRespository.deleteById(id);
			return true;
		}

		return false; // student not found.
	}

}
