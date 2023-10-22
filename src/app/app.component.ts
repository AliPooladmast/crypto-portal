import { Component } from '@angular/core';
import { CurrencyService } from './service/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crypto-portal';
  selectedCurrency: string = 'USD';

  constructor(private currencyService: CurrencyService) {}

  setCurrency = (event: string) => {
    this.currencyService.setCurreny(event);
  };
}
