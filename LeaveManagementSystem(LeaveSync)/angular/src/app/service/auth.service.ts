import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5243/api/User'; // Base URL for authentication endpoints

  constructor(private http: HttpClient) {}

  /**
   * Login the user by sending credentials to the server.
   * @param email - User's email.
   * @param password - User's password.
   * @param role
   * @returns Observable with the user data or an error.
   */




  login(email: string, password: string, role:number): Observable<any> {
    
    const loginData = { email, password,role };
 

    return this.http.post<any>(`${this.apiUrl}/Login`, loginData);
}



// login(form:any): Observable<any[]> {
//   form.role=1

//   const obj={
    
//       "email": form.email,
//       "password": form.password,
//       "role": 1
    
//   }
//   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MzE2OTAiLCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImZpcnN0bmFtZSI6IlN1cGVyIiwibGFzdG5hbWUiOiJBZG1pbiIsImV4cCI6MTczMzk1MjkwOCwiaXNzIjoiTGVhdmUiLCJhdWQiOiJVc2VycyJ9.9uBODCnSC8dhVolVhoWLR2lwbqscNqTQ1oEXqhFwYWQ'; // Replace with the actual token
//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   return this.http.post<any[]>(`http://localhost:5243/api/User/login`,obj, { headers });

// }


  /**
   * Register a new user.
   * @param user - Registration details of the user.
   * @returns Observable for the registration response.
   */
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, user);
  }

  /**
   * Fetch the profile of the currently authenticated user.
   * @returns Observable with user profile data.
   */
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/Profile`, { headers });
  }

  /**
   * Logout the current user by removing the token.
   */
  logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * Check if the user is authenticated.
   * @returns Boolean indicating if the user is logged in.
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Check if a token exists
  }
}
