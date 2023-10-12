import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form-related modules
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: any = FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]]
    });
  }
  // Convenience getters to access form controls in the template
  get userName() { return this.signupForm.get('userName'); }
  get userEmail() { return this.signupForm.get('userEmail'); }
  get password() { return this.signupForm.get('password'); }
 


  studentRole() {
    this.signupForm.get("role").setValue('1')
    console.log("role: ", this.signupForm.get("role").value);
  }
  parentRole() {
    this.signupForm.get("role").setValue('2')
    console.log("role: ", this.signupForm.get("role").value);
  }
  tutorRole() {
    this.signupForm.get("role").setValue('3')
    console.log("role: ", this.signupForm.get("role").value);
  }
  onSubmit() {
    // if (this.signupForm.valid && !this.isSubmitting) {
      // Set the isSubmitting flag to prevent multiple submissions
      // this.isSubmitting = true;

      // Extract user data from the form
      const userData = {
        userName: this.signupForm.get("userName").value,
        userEmail: this.signupForm.get("userEmail").value,
        password: this.signupForm.get("password").value,
        role: this.signupForm.get("role").value
      };

      console.log("sssss",userData)
      // Simulate an HTTP POST request (replace with actual API call)
      this.apiService.UserSignup(userData).subscribe(
        (res : any) => {
          console.log('Signup successful:', res);
          if(res.status){
            this.router.navigate(['']);
          }
        // Reset the flag
        },
        (error) => {
          // Handle error response
          console.error('Signup error:', error);
          this.isSubmitting = false; // Reset the flag
        }
      );
    // }
  }
}


