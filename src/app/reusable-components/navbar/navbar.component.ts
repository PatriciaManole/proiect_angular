import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.afAuth.signOut();
    this.router.navigate(['../home'])
  }
}
