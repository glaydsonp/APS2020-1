import { AuthService } from './../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.create();
  }

  openSnackBar(message) {
    this.snackBar.open(message, null, { duration: 3000 });
  }

  create(): void {
    this.form = this.formBuilder.group({

      email: [null, [Validators.required, Validators.maxLength(150)]],
      password: [null, [Validators.required, Validators.maxLength(150)]]

    });
  }

  onSubmit(formDirective: FormGroupDirective): void {

    if (this.form.valid) {
      this.authService
        .login(
          this.form.value as { email: string, password: string }
        );
    } else {
      this.openSnackBar('Informe todos os campos');
    }

  }
}

