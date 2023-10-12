import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form-related modules
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any = FormGroup;
  isSubmitting = false;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]]
    });
  }
  // // Convenience getters to access form controls in the template
  // get userName() { return this.signupForm.get('userName'); }
  // get userEmail() { return this.signupForm.get('userEmail'); }
  // get password() { return this.signupForm.get('password'); }
  // get role() { return this.signupForm.get('role'); }


  studentRole() {
    this.loginForm.get("role").setValue('1')
    console.log("role: ", this.loginForm.get("role").value);
  }
  parentRole() {
    this.loginForm.get("role").setValue('2')
    console.log("role: ", this.loginForm.get("role").value);
  }
  tutorRole() {
    this.loginForm.get("role").setValue('3')
    console.log("role: ", this.loginForm.get("role").value);
  }

  onSubmit() {
    // if (this.loginForm.valid && !this.isSubmitting) {
    // Set the isSubmitting flag to prevent multiple submissions
    this.isSubmitting = true;

    // Extract user data from the form
    const userData = {
      userEmail: this.loginForm.get("userEmail").value,
      password: this.loginForm.get("password").value,
      role: this.loginForm.get("role").value
    };

    console.log("sssss", userData)
    // Simulate an HTTP POST request (replace with actual API call)
    this.apiService.UserLogin(userData).subscribe(
      (res: any) => {
        console.log("dfdf", res)
        this.loginForm.reset();
        if (res.status) {
          localStorage.setItem("data", res.data);
          if (res.role === 'student') {
            this.router.navigate(['dashboard']);
          }
          else if (res.role === 'parent') {
            this.router.navigate(['dashboard']);
          }
          else if (res.role === 'tutor') {
            this.router.navigate(['dashboard']);
          }
        }
      },
      (error) => {
        // Handle error response
        console.error('Signin error:', error);
        this.isSubmitting = false; // Reset the flag
      }
    );
    // }
  }
}
