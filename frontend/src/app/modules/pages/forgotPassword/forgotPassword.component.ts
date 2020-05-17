import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

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
      confirmEmail: [null, [Validators.required, Validators.maxLength(150)]]

    });
  }

  onSubmit(formDirective: FormGroupDirective): void {

    const aEmail = this.form.get('email').value;
    const aConfirmEmail = this.form.get('confirmEmail').value;

    if (this.form.valid) {

      if(aEmail !== aConfirmEmail){
        this.openSnackBar('Os emails devem ser iguais');
      }else{
        console.log("teste" + this.form.value);
        this.router.navigateByUrl('/')
      }
    }
  }
}
