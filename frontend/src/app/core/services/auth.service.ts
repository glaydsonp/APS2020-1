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
    private sessionService: SessionService
  ) { }

  /**
   * - verifica se usuario esta autenticado
   * - usa o local storage para isto
   */
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
    this.api.post<ISession>(`${environment.API_URL.LOGIN}`, userData, { responseType: 'json' }).subscribe(
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
          preConfirm: (login) => {
            return fetch(`//api.github.com/users/${login}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                return response.json()
              })
              .catch(error => {
                Swal.showValidationMessage(
                  // `Request failed: ${error}`
                  `Código inválido`
                )
              })
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.value) {
            this.sessionService.applySession(res);
            this.router.navigate(['/']);
          }
        })
      }
    );
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
