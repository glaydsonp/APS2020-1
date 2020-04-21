import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplicationHttpClientService } from '../application-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ApiFixadoresService {
  readonly endpoint = `${environment.API_URL.FIXADORES}`;

  constructor(
    private api: ApplicationHttpClientService,
  ) { }


  getCategorias() {
    const url = `${this.endpoint}CatalagoDepartamento`;
    return this.api.get<any>(url);
  }

}
