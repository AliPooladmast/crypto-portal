import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss'],
})
export class CoinDetailComponent implements OnInit {
  coinData: any;
  coinId!: string | null;
  days: number = 1;
  currency: string = 'USD';

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.coinId = params.get('id');
    });

    this.getCoinData();
  }

  getCoinData() {
    if (!this.coinId) return;
    this.api.getCurrencyById(this.coinId).subscribe((res) => {
      this.coinData = res;
    });
  }
}
