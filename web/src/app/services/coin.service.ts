import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { CoinModel } from '../models/CoinModel';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CoinService {

  httpClient: HttpClient;
  httpOptions: {
    headers?: HttpHeaders, params?: HttpParams | {
      [param: string]: string | string[];
    }
  };
  baseUrl = environment.apiUrl;

  constructor(httpClient: HttpClient) {
    this.httpClient  = httpClient;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }),
    };
  }

  getLatestCoinListings(): Observable<CoinModel[]> {
    return this.httpClient.get<CoinModel[]>(`${this.baseUrl}/v1/coin-portfolio-api/coins/listings/latest`, this.httpOptions);
  }
}
