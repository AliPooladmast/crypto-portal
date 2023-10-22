import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getCurrency(currency: string) {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false`
    );
  }

  getTrendingCurrency(currency: string) {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=volume_desc&sparkline=false&price_change_percentage=24h`
    );
  }

  getGraphicalCurrencyData(coinId: string, currency: string, days: number) {
    return this.http.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
    );
  }

  getCurrencyById(coinId: string) {
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  }
}
