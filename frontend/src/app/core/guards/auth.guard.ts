import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LocalStorage } from '../helpers/local-storage.decorator';
import { AuthService } from '../services/auth.service';

/**
 * Serviço de controle de acesso das rotas do app
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  /**
   * Determina se rota pode ser ativada
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authenticated = this.authService.isAuthenticated();
    const url = state.url;

    // LÓGICA:
    // se a rota que se esta tentando acessar começar com /login
    // e estiver autenticado =>
    // se houver redirectTo na url redireciona para a url deste parametro
    // se não houver redireciona para /
    // e não estiver autenticado => permite que url seja acessada (retornando true)

    // se for um rota qualquer
    // e estiver autenticado => permite que url seja acessada (retornando true)
    // e não estiver autenticado => redireciona para o login

    if (state.url.startsWith('/login')) {

      if (authenticated) {
        if (route.queryParams.redirectTo) {
          this.router.navigate([route.queryParams.redirectTo]);
        } else {
          this.router.navigate(['/']);
        }
        return false;
      } else {
        return true;
      }

    } else {

      if (authenticated) {
        return true;
      } else {
        // User is not authenticated. Redirecting to /signin
        this.router.navigate(['/login'], { queryParams: { redirectTo: state.url } });
        return false;
      }

    }

  }

}
