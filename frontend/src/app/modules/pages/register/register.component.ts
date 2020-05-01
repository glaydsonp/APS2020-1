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
              private router: Router) { }

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
      password: [null, [Validators.required,
                        Validators.maxLength(20),
                        Validators.minLength(8),
                        Validators.pattern(
                          /^(?=.*[A-Z])(?=.*['!\{@\}#\$%\^&\*,+./\_()\[¨\]=\-])(?=.*[0-9])(?=.*[a-z]).*$/)
                        ]
                      ],
      confirmPassword: [null, [Validators.required,
                        Validators.maxLength(20),
                        Validators.minLength(8),
                        Validators.pattern(
                          /^(?=.*[A-Z])(?=.*['!\{@\}#\$%\^&\*,+./\_()\[¨\]=\-])(?=.*[0-9])(?=.*[a-z]).*$/)
                        ]
                      ],

    });
  }

  onSubmit(formDirective: FormGroupDirective): void {

    if (this.form.valid) {

    console.log(JSON.stringify(this.form.value));

    } else {
    this.openSnackBar('Informe todos os campos obrigatórios');
    }

  }

}
