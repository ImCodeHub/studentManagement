package com.example.studentManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.studentManagement.Entity.Student;

@Repository
public interface StudentRespository extends JpaRepository<Student, Long>{
	
}

