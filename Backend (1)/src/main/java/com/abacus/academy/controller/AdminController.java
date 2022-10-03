package com.abacus.academy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.abacus.academy.exception.NotFound;
import com.abacus.academy.model.AdminModel;
import com.abacus.academy.model.CourseDAO;
import com.abacus.academy.model.CourseModel;
import com.abacus.academy.model.InstituteDAO;
import com.abacus.academy.model.InstituteModel;
import com.abacus.academy.model.LoginModel;
import com.abacus.academy.model.StudentDAO;
import com.abacus.academy.model.StudentModel;
import com.abacus.academy.service.AdminService;

@RestController
public class AdminController {

	@Autowired
	AdminService adminService;
	
	@PostMapping("/admin/addCourse")
	String addCourse(@RequestBody CourseDAO courseDAO) {
		return adminService.addCourse(courseDAO);
	}
	
	@GetMapping("/admin/viewCourse")
	List<CourseModel> viewCourse() {
		return adminService.viewCourse();
	}
	
	@GetMapping("/admin/getCourse")
	CourseModel getCourse(@RequestParam int courseId) {
		return adminService.getCourse(courseId);
	}
	
	@PutMapping("/admin/editCourse/{courseId}")
	String editCourse(@PathVariable int courseId, @RequestBody CourseDAO courseDAO) throws NotFound {
		
		return adminService.editCourse(courseId,courseDAO);
	}
	
	@DeleteMapping("/admin/deleteCourse")
	String deleteCourse(@RequestParam int courseId) throws NotFound {
		return adminService.deleteCourse(courseId);
	}
	
	@PostMapping("/admin/addInstitute")
	String addInstitute(@RequestBody InstituteDAO instituteDAO) {
		return adminService.addInstitute(instituteDAO);
	}
	
	@GetMapping("/admin/viewInstitute")
	List<InstituteModel> viewInstitute() {
		return adminService.viewInstitute();
	}
	
	@GetMapping("/admin/getInstitute")
	InstituteModel getInstitute(@RequestParam int instituteId) {
		return adminService.getInstitute(instituteId);
	}
	
	@PutMapping("/admin/editInstitute/{instituteId}")
	String editInstitute(@PathVariable int instituteId, @RequestBody InstituteDAO instituteDAO) throws NotFound {
		
		return adminService.editInstitute(instituteId,instituteDAO);
	}
	
	@DeleteMapping("/admin/deleteInstitute")
	String deleteInstitute(@RequestParam int instituteId) throws NotFound {
		return adminService.deleteInstitute(instituteId);
	}
	
	@PostMapping("/admin/addStudent")
	String addStudent(@RequestBody StudentDAO studentDAO) {
		return adminService.addStudent(studentDAO);
	}
	
	@GetMapping("/admin/viewStudent")
	List<StudentModel> viewStudent() {
		return adminService.viewStudent();
	}
	
	@GetMapping("/admin/getStudent")
	StudentModel getStudent(@RequestParam int instituteId) {
		return adminService.getStudent(instituteId);
	}
	
	@PutMapping("/admin/editStudent/{studentId}")
	String editStudent(@PathVariable int studentId, @RequestBody StudentDAO studentDAO) throws NotFound {
		
		return adminService.editStudent(studentId,studentDAO);
	}
	
	@DeleteMapping("/admin/deleteStudent")
	String deleteStudent(@RequestParam int studentId) throws NotFound {
		return adminService.deleteStudent(studentId);
	}
	
	
}
