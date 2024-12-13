import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup,        FormsModule,        ReactiveFormsModule,    Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ManageRequestService } from '../service/manageRequest.service';

@Component({
  selector: 'app-leave-request',
  imports: [RouterModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})


export class LeaveRequestComponent {
  leaveRequestForm: FormGroup;
  successMessage!: string;
  errorMessage!: string;
  leaveRequests: Array<{
    applyDate: string;
    fromDate: string;
    days: number;
    reason: string;
    status: string;
    // rejectionReason?: string;
  }> = [];

  // Modal-related properties
  selectedRequest: any = null;
  // rejectionReason: string = '';

  constructor(private fb: FormBuilder ,private manageRequestService:ManageRequestService) {
    this.leaveRequestForm = this.fb.group({
      applyDate: ['', Validators.required],
      fromDate: ['', Validators.required],
      days: [1, [Validators.required, Validators.min(1)]],
      reason: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.leaveRequestForm.valid) {
      const leaveRequest = {
        ...this.leaveRequestForm.value,
        status: 'Pending',
        rejectionReason: ''
      };
        // Add the leave request to the list
        this.leaveRequests.push(leaveRequest);
        this.manageRequestService.CreateLeaveRequests(leaveRequest).subscribe(
          (data) => {
            if (data) {
              console.log('save Successful:', data);
              // this.loginError = '';
              
            } else {
              // this.loginError = 'Invalid email or password.';
              console.log('err');
              
            }
          },
          (error) => {
            console.error('Error during login:', error);
            // this.loginError = 'An error occurred during login. Please try again later.';
            console.log('err');
            
          }
        )

        // Simulate a successful submission
        this.successMessage = 'Leave request submitted successfully!';
        this.leaveRequestForm.reset();
        this.errorMessage = '';
  
        setTimeout(() => {
          this.successMessage = '';
        }, 1000);
      } else {
        // If the form is invalid, show an error message
        this.errorMessage = 'Please fill out all required fields.';
        this.successMessage = '';
      }
    }


    
  
    approveRequest(request: any): void {
      request.status = 'Approved';
    }
  
    // openRejectModal(request: any): void {
    //   this.selectedRequest = request;
    //   this.rejectionReason = '';
    // }
  
    // rejectRequest(): void {
    //   if (this.selectedRequest) {
    //     this.selectedRequest.status = 'Rejected';
    //     this.selectedRequest.rejectionReason = this.rejectionReason;
    //     this.selectedRequest = null; // Close the modal
    //   }
    // }
  }
  