import { ApplicationHttpClientService } from './../../../core/services/application-http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private request: ApplicationHttpClientService) { }

  ngOnInit() {
    this.create();
  }

  openSnackBar(message) {
    this.snackBar.open(message, null, { duration: 3000 });
  }

  create(): void {
    this.form = this.formBuilder.group({

      name: [null, [Validators.required, Validators.maxLength(150)]],
      email: [null, [Validators.required, Validators.maxLength(150)]],
      confirmEmail: [null, [Validators.required, Validators.maxLength(150)]],
      phoneNumber: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11) ]],
      password: [null, [Validators.required,
                        Validators.maxLength(20),
                        Validators.minLength(8),
                        Validators.pattern(
                          /^(?=.*[A-Z])(?=.*['!\{@\}#\$%\^&\*,+./\_()\[¨\]=\-])(?=.*[0-9])(?=.*[a-z]).*$/)
                        ]
                      ],
      confirmPassword: [null]

    });
  }

  onSubmit(formDirective: FormGroupDirective): void {

      const aName = this.form.get('name').value;
      const aEmail = this.form.get('email').value;
      const aPhoneNumber = this.form.get('phoneNumber').value;
      const aPassword = this.form.get('password').value;



      if (this.form.valid) {

        if (aEmail !== this.form.get('confirmEmail').value) {
          this.openSnackBar('Os emails devem ser iguais');
         } else {
            if (aPassword !== this.form.get('confirmPassword').value) {
              this.openSnackBar('As senhas devem ser iguais');
            } else {


              const data = {
                name: aName,
                email: aEmail,
                phoneNumber: aPhoneNumber,
                password: aPassword
              };

              this.request.post('users',data, { responseType: 'json' }).subscribe( res => {
                this.openSnackBar('Usuário cadastrado com sucesso');
                this.form.reset();
                this.router.navigateByUrl('/')
              },
              (error: HttpErrorResponse) => {
                console.log(error);
                if(error.status === 400){
                  this.openSnackBar('Email ou telefone já cadastrados');
                }
              });
            }
         }
    } else {
    this.openSnackBar('Informe todos os campos obrigatórios');
    }

  }

}
