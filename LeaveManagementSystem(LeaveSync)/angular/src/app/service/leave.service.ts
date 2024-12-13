import { Injectable } from '@angular/core';
import { Leave } from '../models/leave.model';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private leaves: Leave[] = [];

  getLeavesByStudent(studentId: string): Leave[] {
    return this.leaves.filter((leave) => leave.studentId === studentId);
  }

  applyLeave(leave: Leave): void {
    leave.id = Math.random().toString(36).substring(2, 15);
    leave.status = 'Pending';
    this.leaves.push(leave);
  }
}
