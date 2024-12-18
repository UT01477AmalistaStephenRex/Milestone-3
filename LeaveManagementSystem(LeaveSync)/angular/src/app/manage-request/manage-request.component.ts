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
    console.log(`Accepted request with ID: ${requestId}`);
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
