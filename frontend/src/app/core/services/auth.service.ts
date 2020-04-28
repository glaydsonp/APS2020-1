import { Injectable } from '@angular/core';
import { LocalStorage } from '../helpers/local-storage.decorator';
import { Token } from '../data/auth/token.interface';
import { ApplicationHttpClientService } from './application-http-client.service';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * referencia LocalStorage('TOKEN')
   */
  @LocalStorage('TOKEN')
  token: Token;

  constructor(
    private api: ApplicationHttpClientService,
    private router: Router,
  ) { }

  /**
   * - verifica se usuario esta autenticado
   * - usa o local storage para isto
   */
  isAuthenticated() {
    const now = moment();
    const expirationDate = this.token ? moment(this.token.expiration) : null;
    return !(this.token === undefined || this.token === null) && now.isBefore(expirationDate);
  }

  login(userData: {
    email: string;
    password: string;
  }) {
    const backenPath = `????`;
    const body = {
      AccessKey: userData.email,
      AccessSecret: userData.password,
    };

    return this.api.post<Token>(backenPath, body).pipe(
      tap(  token => this.token = token ),
    );
  }

  /**
   * - reseta o token na local storage
   */
  logout() {
    // to-do: implementar query de redirect opcional para quando usuário deslogar e logar voltar de onde parou
    this.token = null;
    // to-do: mudar lógica para recarregar mesma rota
    this.router.navigateByUrl('/login');
  }

}