import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define an interface for User
export interface User {
  id: number; // Unique identifier for the user
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'lecturer' | 'director' | 'founder'; // User roles
  password?: string; // For simplicity, plain text (use encryption in production)
}

// Define an interface for LeaveRequest
export interface LeaveRequest {
  id: number; // Unique identifier for the leave request
  userId: number; // ID of the user making the request
  startDate: Date; // Leave start date
  endDate: Date; // Leave end date
  reason: string; // Reason for leave
  status: 'pending' | 'approved' | 'rejected'; // Leave status
}



@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private users: User[] = []; // Store registered users
  private leaveRequests: LeaveRequest[] = []; // Store leave requests
  private nextUserId: number = 1; // Auto-increment ID for new users
  private nextRequestId: number = 1; // Auto-increment ID for leave requests


  constructor(private http: HttpClient) {}

  /**
   * Add a new user to the system.
   * @param user - User object to add.
   */
  addUser(user: Omit<User, 'id'>): void {
    const newUser: User = { ...user, id: this.nextUserId++ };
    this.users.push(newUser);
  }

  addStudent(user: any): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://localhost:5243/api/User/CreateUser`, user, { headers });
}


  /**
   * Get all registered users.
   * @returns Array of users.
   */
  getStudents(): Observable<any[]> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>('http://localhost:5243/api/User/AllUsers', { headers });
  }

  /**
   * Update a user by ID.
   * @param id - ID of the user to update.
   * @param updatedUser - Updated user object (without ID).
   * @throws Error if user with the given ID is not found.
   */
  updateUser(id: number, updatedUser: Omit<User, 'id'>): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error(`User with ID ${id} not found.`);
    }
    this.users[index] = { ...updatedUser, id };
  }

  updateStudent(user: any): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`http://localhost:5243/api/User/UserRequest7?status=${user}`, user, { headers });
}


  /**
   * Delete a user by ID.
   * @param id - ID of the user to delete.
   * @throws Error if user with the given ID is not found.
   */
  deleteUser(id: number): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error(`User with ID ${id} not found.`);
    }
    this.users.splice(index, 1);
  }

  deleteStudent(id: number): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`http://localhost:5243/api/User/DeleteById?Id=${id}`)
  }

  /**
   * Find a user by ID.
   * @param id - ID of the user to find.
   * @returns User object or null if not found.
   */
  getUserById(id: number): User | null {
    return this.users.find((user) => user.id === id) || null;
  }

  // http://localhost:5243/api/User/UserById?Id=7

  /**
   * Authenticate a user by email and password.
   * @param email - Email of the user.
   * @param password - Password of the user.
   * @returns User object if authentication is successful, otherwise null.
   */
  authenticateUser(email: string, password: string): User | null {
    return this.users.find(
      (user) => user.email === email && user.password === password
    ) || null;
  }

  /**
   * Add a leave request for a user.
   * @param request - LeaveRequest object to add (without ID).
   */
  addLeaveRequest(request: Omit<LeaveRequest, 'id'>): void {
    const newRequest: LeaveRequest = { ...request, id: this.nextRequestId++ };
    this.leaveRequests.push(newRequest);
  }

  /**
   * Get all leave requests.
   * @returns Array of leave requests.
   */
  getLeaveRequests(): LeaveRequest[] {
    return [...this.leaveRequests]; // Return a copy of the leave requests array
  }

  /**
   * Update a leave request by ID.
   * @param id - ID of the leave request to update.
   * @param updatedRequest - Updated leave request object (without ID).
   * @throws Error if leave request with the given ID is not found.
   */
  updateLeaveRequest(id: number, updatedRequest: Omit<LeaveRequest, 'id'>): void {
    const index = this.leaveRequests.findIndex((request) => request.id === id);
    if (index === -1) {
      throw new Error(`Leave request with ID ${id} not found.`);
    }
    this.leaveRequests[index] = { ...updatedRequest, id };
  }

  /**
   * Fetch data for the current user (mock implementation).
   * @returns Current user and their leave requests.
   */
  getCurrentUser(): { user: User | null; leaveRequests: LeaveRequest[] } {
    // Simulated data for the current user (ID = 1)
    const currentUser = this.getUserById(1);
    const userRequests = this.leaveRequests.filter((request) => request.userId === 1);
    return { user: currentUser, leaveRequests: userRequests };
  }
   /**
   * Add or update a student based on edit state.
   * @param isEdit - Boolean indicating whether the operation is an edit.
   * @param newStudent - Student data to add or update.
   * @param editId - ID of the student to edit (if applicable).
   */
   addOrUpdateStudent(isEdit: boolean, newStudent: Omit<User, 'id'>, editId?: number): void {
    if (isEdit && editId !== undefined) {
      this.updateUser(editId, newStudent);
    } else {
      this.addUser(newStudent);
    }
  }
}
