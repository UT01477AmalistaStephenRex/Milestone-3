import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-manage-students',
  standalone:true,
  imports: [RouterModule,FormsModule,CommonModule],

  templateUrl: './manage-students.component.html',
  styleUrl: './manage-students.component.css'
})
export class ManageStudentsComponent implements OnInit {
  users: any[] = [];
  showAddStudentModal = false;
  isEdit = false; // Flag for edit mode
  editIndex: number | null = null; // Store the index of the student being edited
  
  newStudent = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    role : 'student' as 'student' | 'lecturer' | 'director' | 'founder',
    password: ''  // Add this field to match the required type
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    console.log("load students")
    this.studentService.getStudents().subscribe(
      (students) => {
        this.users = students;
        console.log(this.users)
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  onAddStudent(): void {
    if (this.isEdit && this.editIndex !== null) {
        // Edit existing student
        this.studentService.updateStudent(this.newStudent).subscribe(
            (response) => {
                console.log('Student updated successfully:', response);

                // Reload students after editing
                this.loadStudents();
            },
            (error) => {
                console.error('Error updating student:', error);
            }
        );
    } else {
        // Add new student
        this.studentService.addStudent(this.newStudent).subscribe(
            (response) => {
                console.log('Student added successfully:', response);

                // Reload students after adding
                this.loadStudents();
            },
            (error) => {
                console.error('Error adding student:', error);
            }
        );
    }

    // Reset form and modal state
    this.newStudent = { firstName: '', lastName: '', email: '', mobile: '', role: 'student' as 'student' | 'lecturer' | 'director' | 'founder', password: '' };
    this.showAddStudentModal = false;
    this.isEdit = false;
    this.editIndex = null;
}

  cancelAdd(): void {
    this.showAddStudentModal = false;
    this.isEdit = false;
    this.editIndex = null;
  }

  onDelete(index: number): void {
    this.studentService.deleteStudent(index).subscribe(
      (response) => {
        // Optionally handle the response from the server (success message, etc.)
        console.log('Student deleted successfully:', response);
        
        // Reload students after successful deletion
        this.loadStudents();
      },
      (error) => {
        // Handle any errors that occur during the deletion process
        console.error('Error deleting student:', error);
      }
    );
    console.log(index);
    
  }

  onEdit(user: any, index: number): void {
    this.studentService.updateStudent(user).subscribe(
      (response) => {
        // Optionally handle the response from the server (success message, etc.)
        console.log('Student updated successfully:', response);

        // Reload students after successful update
        this.loadStudents();
      },
      (error) => {
        // Handle any errors that occur during the update process
        console.error('Error updating student:', error);
      }
    );

    console.log('Editing student at index:', index);
}

}
