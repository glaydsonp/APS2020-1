import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import { Response } from '../data/response/response.interface';
import { ApiError } from '../classes/api-error.class';
import { LocalStorage } from '../helpers/local-storage.decorator';
import { Token } from '../data/auth/token.interface';
import { Router } from '@angular/router';
import { ERROR_ROUTE, LOGIN_ROUTE } from '../../app.config';
import { ToastService } from './toast.service';
import { MessageType } from '../data/response/messages-type.enum';
import { isResponse } from '../type-guards/response.type-guard';
import { ISession } from '../data/api/session/session';
// import { NgProgress } from 'ngx-progressbar';
// import { LoadingBarService } from '@ngx-loading-bar/core';

export interface RequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json' | 'blob';
  withCredentials?: boolean;
  body?: any;
}

export interface RequestOptionsJson extends RequestOptions {
  responseType?: 'json';
}

export interface RequestOptionsBlob extends RequestOptions {
  responseType: 'blob';
}

export interface RequestConfig {
  auth: boolean;
  loading: boolean;
  backendNotifications: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationHttpClientService {
  private baseUrl = environment.API_URL.BASE;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private sessionService: SessionService
    // private loadingBarService: NgProgress,
  ) { }

  request<T>(
    method: 'GET' | 'DELETE' | 'POST' | 'PUT',
    backendPath: string,
    body?: any,
    options?: RequestOptions,
    unwrap: boolean = true,
    config: Partial<RequestConfig> = {}
  ): Observable<T | Response<T> | Blob> {
    // inicializa configurações da request, misturando as predefinições com as novas definições
    // tslint:disable-next-line:variable-name
    const _config: RequestConfig = Object.assign(
      {
        auth: true,
        loading: true,
        backendNotifications: true,
      },
      config
    );
    // tslint:disable-next-line:variable-name
    let _options = options;

    if (_config.auth && this.sessionService.getSession()) {
      _options = this.addAuthorizationHeader(_options);
    }

    if (_config.loading) {
      // this.loadingBarService.start();
    }

    const requestUrl = this.baseUrl + backendPath;

    if (_options.responseType === 'blob') {
      let request: Observable<Blob>;

      if (method === 'GET') {
        request = this.http.get(requestUrl, _options as RequestOptionsBlob);
      }

      if (method === 'DELETE') {
        request = this.http.delete(requestUrl, _options as RequestOptionsBlob);
      }

      if (method === 'POST') {
        request = this.http.post(requestUrl, body, _options as RequestOptionsBlob);
      }

      if (method === 'PUT') {
        request = this.http.put(requestUrl, body, _options as RequestOptionsBlob);
      }

      return request.pipe(
        this.completeLoadingHandler(),
        this.responseErrorHandler(_config),
      ) as Observable<Blob>;

    } else {

      let request: Observable<Response<T>>;

      if (method === 'GET') {
        request = this.http.get<Response<T>>(requestUrl, _options as RequestOptionsJson);
      }

      if (method === 'DELETE') {
        request = this.http.delete<Response<T>>(requestUrl, _options as RequestOptionsJson);
      }

      if (method === 'POST') {
        request = this.http.post<Response<T>>(requestUrl, body, _options as RequestOptionsJson);
      }

      if (method === 'PUT') {
        request = this.http.put<Response<T>>(requestUrl, body, _options as RequestOptionsJson);
      }

      return request.pipe(
        this.backendNotificationsHandler(_config, _options as RequestOptionsJson),
        this.completeLoadingHandler(),
        this.responseErrorHandler(_config),
        this.responseHandler(unwrap),
      ) as Observable<T | Response<T>>;

    }

  }

  // PRIVATE METHODS
  // ===============

  private backendNotificationsHandler(config: RequestConfig, options: RequestOptionsJson) {
    return tap((response: Response<any>) => {
      if (config.backendNotifications && response && response.messages) {
        this.toastService.toast(response.messages);
      }
    });
  }

  private completeLoadingHandler() {
    return finalize(
      () => { /* this.loadingBarService.done() */ } ,
    );
  }

  private responseHandler(unwrap: boolean) {
    return map(<T>(response: Response<T>) => {
      if (response && response.isSucceed) {
        if (unwrap) {
          return response.data;
        } else {
          return response;
        }
      } else {
        throw new ApiError(response ? response.messages : []);
      }
    });
  }

  private responseErrorHandler(config: RequestConfig) {
    return catchError((err: any) => {
      let responseErrorMessageToasted = false;
      // tslint:disable-next-line:no-string-literal max-line-length
      if (config.backendNotifications && err instanceof HttpErrorResponse && isResponse(err.error) && err.error && err.error['messages']) {
        // tslint:disable-next-line:no-string-literal
        this.toastService.toast(err.error['messages']);
        responseErrorMessageToasted = true;
      }

      // verifica se o status do erro é 401,
      // verifica se o status do erro é 403,

      if (err instanceof HttpErrorResponse && err.status === 401) {
        // to-do: deslogar usuário
        // this.logoutService.logout(this.router.url);
      } else if (err instanceof HttpErrorResponse && err.status === 403) {
        // redireciona para pagina de acesso negado
        this.router.navigate([`/${ERROR_ROUTE}/${err.status}`], {
          queryParams: { redirectTo: this.router.url }
        });
      } else if (err instanceof HttpErrorResponse && !responseErrorMessageToasted && config.backendNotifications) {
        this.toastService.toast(
          { description: `Erro ao se conectar com o servidor. Código: ${err.status}`, type: MessageType.error });
      }

      console.log({ err, from: this });

      return throwError(err);
    });
  }

  private addAuthorizationHeader(options: RequestOptions = {}): RequestOptions {
    return this.addHeader(
      options,
      'Authorization',
      `Bearer ${this.sessionService.getSession().token}`
    );
  }

  private addHeader(
    options: RequestOptions,
    headerName: string,
    headerValue: string
  ) {
    if (options.headers) {
      options.headers = options.headers.set(headerName, headerValue);
    } else {
      options.headers = new HttpHeaders({
        [headerName]: headerValue
      });
    }

    return options;
  }

  // PUBLIC METHODS
  // ===============

  get(
    backendPath: string,
    options?: RequestOptionsBlob,
    unwrap?: boolean,
    config?: Partial<RequestConfig>
  ): Observable<Blob>;
  get<T>(
    backendPath: string,
    options?: RequestOptionsJson,
    unwrap?: true,
    config?: Partial<RequestConfig>
  ): Observable<T>;
  get<T>(
    backendPath: string,
    options?: RequestOptionsJson,
    unwrap?: false,
    config?: Partial<RequestConfig>
  ): Observable<Response<T>>;
  // tslint:disable-next-line:max-line-length
  get<T>(
    backendPath: string,
    options?: RequestOptions,
    unwrap: boolean = true,
    config: Partial<RequestConfig> = {}
  ): Observable<T | Response<T> | Blob> {
    return this.request('GET', backendPath, null, options, unwrap, config);
  }

  delete(
    backendPath: string,
    options?: RequestOptionsBlob,
    unwrap?: boolean,
    config?: Partial<RequestConfig>
  ): Observable<Blob>;
  delete<T>(
    backendPath: string,
    options?: RequestOptionsJson,
    unwrap?: true,
    config?: Partial<RequestConfig>
  ): Observable<T>;
  delete<T>(
    backendPath: string,
    options?: RequestOptionsJson,
    unwrap?: false,
    config?: Partial<RequestConfig>
  ): Observable<Response<T>>;
  // tslint:disable-next-line:max-line-length
  delete<T>(
    backendPath: string,
    options?: RequestOptions,
    unwrap: boolean = true,
    config: Partial<RequestConfig> = {}
  ): Observable<T | Response<T> | Blob> {
    return this.request('DELETE', backendPath, null, options, unwrap, config);
  }

  post(
    backendPath: string,
    body?: any,
    options?: RequestOptionsBlob,
    unwrap?: boolean,
    config?: Partial<RequestConfig>,
  ): Observable<Blob>;
  post<T>(
    backendPath: string,
    body?: any,
    options?: RequestOptionsJson,
    unwrap?: true,
    config?: Partial<RequestConfig>
  ): Observable<T>;
  // tslint:disable-next-line:max-line-length
  post<T>(
    backendPath: string,
    body?: any,
    options?: RequestOptionsJson,
    unwrap?: false,
    config?: Partial<RequestConfig>
  ): Observable<Response<T>>;
  // tslint:disable-next-line:max-line-length
  post<T>(
    backendPath: string,
    body?: any,
    options?: RequestOptions,
    unwrap: boolean = true,
    config: Partial<RequestConfig> = {}
  ): Observable<T | Response<T> | Blob> {
    return this.request('POST', backendPath, body, options, unwrap, config);
  }

  put(
    backendPath: string,
    body?: any,
    options?: RequestOptionsBlob,
    unwrap?: boolean,
    config?: Partial<RequestConfig>,
  ): Observable<Blob>;
  put<T>(
    backendPath: string,
    body?: any,
    options?: RequestOptionsJson,
    unwrap?: true,
    config?: Partial<RequestConfig>
  ): Observable<T>;
  // tslint:disable-next-line:max-line-length
  put<T>(
    backendPath: string,
    body?: any,
    options?: RequestOptionsJson,
    unwrap?: false,
    config?: Partial<RequestConfig>
  ): Observable<Response<T>>;
  // tslint:disable-next-line:max-line-length
  put<T>(
    backendPath: string,
    body?: any,
    options?: RequestOptions,
    unwrap: boolean = true,
    config: Partial<RequestConfig> = {}
  ): Observable<T | Response<T> | Blob> {
    return this.request('PUT', backendPath, body, options, unwrap, config);
  }

}
