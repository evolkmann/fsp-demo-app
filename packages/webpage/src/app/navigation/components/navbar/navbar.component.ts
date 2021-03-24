import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';
import { Employee } from 'src/app/shared/models/employee.model';
import { Role } from 'src/app/shared/models/role.model';

@Component({
  selector: 'fsp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user!: Observable<firebase.default.User | null>;
  employee?: Observable<Employee>;
  role?: Observable<Role | undefined>;

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly router: Router,
    public readonly userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async logout() {
    await this.auth.signOut();
    await this.router.navigateByUrl('/auth/login');
  }

}
