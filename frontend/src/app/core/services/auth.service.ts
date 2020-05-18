import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from './session.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { LocalStorage } from '../helpers/local-storage.decorator';
import { Token } from '../data/auth/token.interface';
import { ApplicationHttpClientService } from './application-http-client.service';
import * as moment from 'moment';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ISession } from '../data/api/session/session';
import Swal from 'sweetalert2';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * referencia LocalStorage('TOKEN')
   */
  @LocalStorage('TOKEN')
  token: Token;

  isAuthenticated$ = this.sessionService.session$.pipe(
    map(session => this.isAuthenticated(session))
  );

  constructor(
    private api: ApplicationHttpClientService,
    private router: Router,
    private sessionService: SessionService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * - verifica se usuario esta autenticado
   * - usa o local storage para isto
   */

  openSnackBar(message) {
    this.snackBar.open(message, null, { duration: 3000 });
  }

  isAuthenticated(session = this.sessionService.getSession()) {
    // const now = moment();
    // const expirationDate = this.token ? moment(this.token.expiration) : null;
    // return !(this.token === undefined || this.token === null) && now.isBefore(expirationDate);
    return !!session;
  }

  login(userData: {
    email: string;
    password: string;
  }): void {

    this.api.post(`${environment.API_URL.LOGIN}`, { ...userData }, { responseType: 'json' }).toPromise().then(
      res => {
        Swal.fire({
          title: 'Coloque o código enviado por email:',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Confirmar',
          showLoaderOnConfirm: true,
          preConfirm: (codigo) => {
            return this.api.post<ISession>(`${environment.API_URL.TFA}`, { email: userData.email, codigo }, { responseType: 'json' })
              .toPromise().then(
                response => {
                  this.sessionService.applySession(response);
                  this.router.navigate(['/']);
                }, err => {
                  console.log(err);
                }
              ).catch(
                err => {
                  console.log(err);
                }
              );
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.value) {
          }
        });


      }).catch(
        (err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.openSnackBar('Email não cadastrado');
          }
        });
  }

  logout(): void {
    // to-do: implementar query de redirect opcional para quando usuário deslogar e logar voltar de onde parou
    // this.token = null;
    // to-do: mudar lógica para recarregar mesma rota
    // this.router.navigateByUrl('/login');
    this.sessionService.resetSession();
    localStorage.clear();
    location.reload();
  }
}
