import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'fsp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: Observable<firebase.default.User | null>;

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.auth.user;
  }

  async logout() {
    await this.auth.signOut();
    await this.router.navigateByUrl('/auth/login');
  }

}
