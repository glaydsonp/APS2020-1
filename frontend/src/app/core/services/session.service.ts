import { ApplicationHttpClientService } from './application-http-client.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/internal/operators/tap';
import { ISession } from '../data/api/session/session';
import { LocalStorage } from '../helpers/local-storage.decorator';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  @LocalStorage('SESSION') private session: ISession;
  // tslint:disable-next-line: variable-name
  protected _session$ = new BehaviorSubject<ISession>(this.session);
  session$ = this._session$.asObservable();

  constructor() { }

  applySession(data: ISession): void {
    this.session = data;
    this._session$.next(this.session);
  }

  getSession(): ISession {
    return this.session;
  }

  /**
   * - reseta o token na local storage
   */
  resetSession(): void {
    this.session = null;
    this._session$.next(null);
  }

}
