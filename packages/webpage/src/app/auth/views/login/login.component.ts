import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { NEXT_URL_PARAM } from 'src/app/app-routing.module';

@Component({
  selector: 'fsp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  readonly form = new FormGroup({
    email: new FormControl(null, [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required
    ])
  })

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly meta: MetaService
  ) { }

  ngOnInit(): void {
    this.meta.setTitle('Login');
  }

  async login() {
    const { email, password } = this.form.value;
    this.form.markAsPending();
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      const target = decodeURIComponent(this.route.snapshot.queryParams[NEXT_URL_PARAM]) || '';
      await this.router.navigateByUrl(target);
    } catch (error) {
      this.form.setErrors({
        login: {
          code: error.code,
          message: error.message
        }
      });
    }
  }

}
