import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  form = {
    username: '',
    password: '',
  };
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  login() {
    let user = this.authService.login(
      this.form.username,
      this.form.password
    );
    console.log('haha', this.form);

    if (!user) {
      alert('Invalid username or password');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
