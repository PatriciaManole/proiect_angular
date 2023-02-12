import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.authService
      .signupUser(this.signupForm.value)
      .then(async (result) => {
        if (result == null)
        {
            this.router.navigate(['../login']);
        }
      })
      .catch(() => {
        alert('Error');
      });
  }

}
