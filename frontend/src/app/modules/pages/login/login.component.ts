import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router) { }

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

      console.log(JSON.stringify(this.form.value));

          // this.loginService
          //   .login(JSON.stringify(this.form.value))
          //   .subscribe(
          //     res => {
          //       // mostrar login
          //       // desenvolver [   ]
          //       this.form.reset();
          //       formDirective.resetForm();
                  //  this.router.navigate(['']);
          //     },
          //     (error: HttpErrorResponse) => {
          //         this.openSnackBar("Usuário ou senha inválido");
          //     }
          //   );

        }else {
          this.openSnackBar("Informe todos os campos");
        }

    }
  }
}
