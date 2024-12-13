import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentService } from '../service/student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManageRequestService } from '../service/manageRequest.service';

@Component({
  selector: 'app-manage-request',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './manage-request.component.html',
  styleUrl: './manage-request.component.css'
})
export class ManageRequestComponent implements OnInit {
  userData: any = {};
  leaveRequests: any[] = [];
  selectedRequest: any = null;
  rejectionReason: string = '';

  constructor(private ManageRequestService:ManageRequestService) {}
  requests: any[] = [];
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Fetch current user data from the service
    // this.ManageRequestService.getCurrentUser().subscribe(
    //     (user) => {
    //         this.userData = user;
    //         console.log('Current user data fetched:', this.userData);
    //     },
    //     (error) => {
    //         console.error('Error fetching user data:', error);
    //     }
    // );

    // Fetch leave requests from the service
    this.ManageRequestService.getLeaveRequests().subscribe(
        (requests) => {
            this.leaveRequests = requests;
            console.log('Leave requests fetched:', this.leaveRequests);
        },
        (error) => {
            console.error('Error fetching leave requests:', error);
        }
    );
  }


  acceptRequest(requestId: number): void {
    this.ManageRequestService.acceptRequest(requestId).subscribe(
      (response) => {
        console.log(`Accepted request with ID: ${requestId}`, response);
        // Optionally, refresh the list of requests
        this.loadRequests();
      },
      (error) => {
        console.error(`Error accepting request with ID: ${requestId}`, error);
      }
    );
  }

  // Method to load a specific request by its ID
  loadRequests(requestId?: number): void {
    if (requestId) {
      this.ManageRequestService.getRequests(requestId).subscribe(
        (response) => {
          console.log(`Loaded request with ID: ${requestId}`, response);
          this.requests = [response];  // Display only the specific request in the list
        },
        (error) => {
          console.error(`Error loading request with ID: ${requestId}`, error);
        }
      );
    } else {
      // If no ID is provided, load all requests (if applicable)
      // this.manageRequestService.getAllRequests().subscribe(...)
    }
  }

  rejectRequest(): void {
    if (this.selectedRequest && this.rejectionReason) {
      console.log(
        `Rejected request with ID: ${this.selectedRequest.id}, Reason: ${this.rejectionReason}`
      );
      this.rejectionReason = '';
      this.selectedRequest = null;
    }
  }

  openRejectModal(request: any): void {
    this.selectedRequest = request;
  }
}
