import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
export class ManageRequestService {
  private apiUrl = 'http://localhost:5243/api/Request'; // API endpoint for leave requests

  constructor(private http: HttpClient) {}

  /**
   * Get all leave requests.
   * @returns Observable of leave requests.
   */
  getCurrentUser(): Observable<any> {  
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`http://localhost:5243/api/User/AllUsers`, { headers });
}

getLeaveRequests(): Observable<any[]> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`http://localhost:5243/api/Request/AllRequest`, { headers });
}

CreateLeaveRequests(form:any): Observable<any[]> {
  form.userId=15
  form.status=1
 const obj={
    "userId": 15,
    "reason": form.reason,
    "fromDate": (new Date(form.fromDate)).toISOString(),
    "applyDate": (new Date(form.applyDate)).toISOString(),
    "days":`${form.days}`,
    "status": 1
  }

  const obj2={
    
      "userId": 7,
      "reason": "string",
      "fromDate": "2024-12-12T20:54:04.870Z",
      "applyDate": "2024-12-12T20:54:04.870Z",
      "days": "string",
      "status": 1
    
  }
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post<any[]>(`http://localhost:5243/api/Request/RequestRent`,obj, { headers });
}

  /**
   * Get leave request by ID.
   * @param requestId - ID of the leave request.
   * @returns Observable of the leave request.
   */
  getLeaveRequestById(requestId: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${this.apiUrl}/GetRequestById/${requestId}`);
  }

  /**
   * Accept a leave request.
   * @param requestId - ID of the leave request.
   * @returns Observable of the updated leave request.
   */
  acceptLeaveRequest(requestId: number): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.apiUrl}/AcceptRequest/${requestId}`, {});
  }

  acceptRequest(requestId: number): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put<any>(`http://localhost:5243/api/Request/AcceptRejectRequest17?status=${requestId}`, {}, { headers });
  }
  
  loadRequests(requestId: number,status:number){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put<any>(`http://localhost:5243/api/Request/AcceptRejectRequest?status=${requestId}`, {}, { headers });
  }


  getRequests(requestId: number): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Make a GET request to the API with requestId and status as query parameters
    return this.http.get<any>(`http://localhost:5243/api/Request/RequestById=${requestId}&status=${status}`, { headers });
  }


  /**
   * Reject a leave request with a rejection reason.
   * @param requestId - ID of the leave request.
   * @param rejectionReason - Reason for rejecting the request.
   * @returns Observable of the updated leave request.
   */
  rejectLeaveRequest(requestId: number, rejectionReason: string): Observable<LeaveRequest> {
    const body = { rejectionReason };
    return this.http.put<LeaveRequest>(`${this.apiUrl}/RejectRequest/${requestId}`, body);
  }

  /**
   * Add a new leave request.
   * @param leaveRequest - The leave request object.
   * @returns Observable of the added leave request.
   */
  addLeaveRequest(leaveRequest: Omit<LeaveRequest, 'id'>): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${this.apiUrl}/AddLeaveRequest`, leaveRequest);
  }
}


