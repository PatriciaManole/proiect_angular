import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        if (result == null) {
          this.router.navigate(['../events']);
        }
      });
  }
}
