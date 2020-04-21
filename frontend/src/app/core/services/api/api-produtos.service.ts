import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Response } from 'src/app/core/data/response/response.interface';
import { Familia } from 'src/app/core/data/api/produtos/family.interface';
import { ApplicationHttpClientService } from '../application-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ApiProdutosService {
  readonly endpoint = `${environment.API_URL.PRODUTOS}`;

  constructor(
    public api: ApplicationHttpClientService,
  ) { }

  /**
   * Busca Familia por id
   */
  getFamilia(slugFamilia: string) {
    const url = `${this.endpoint}DetalheProduto`;
    const params = new HttpParams().set('slugFamilia', String(slugFamilia));
    return this.api.get<Familia>(url, { params });
  }

}
