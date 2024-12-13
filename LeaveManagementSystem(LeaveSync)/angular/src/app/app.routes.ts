import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { ManageStudentsComponent } from './manage-students/manage-students.component';
import { ManageRequestComponent } from './manage-request/manage-request.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'leave-request',component:LeaveRequestComponent},
  { path: 'manage-students',component:ManageStudentsComponent},
  { path: 'manage-request',component:ManageRequestComponent},
  { path: 'admin-dashboard',component:AdminDashboardComponent},
  { path: '**', redirectTo: '' }, 
];
