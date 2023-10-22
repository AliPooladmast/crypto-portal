import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss'],
})
export class CoinDetailComponent implements OnInit {
  coinData: any;
  coinId!: string | null;
  days: number = 1;
  currency!: string;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.coinId = params.get('id');
    });

    this.currencyService.getCurrency().subscribe((value) => {
      this.currency = value;

      this.getCoinData();
      this.getGraphData();
    });
  }

  getCoinData() {
    if (!this.coinId) return;
    this.api.getCurrencyById(this.coinId).subscribe((res: any) => {
      this.coinData = res;
    });
  }

  getGraphData() {
    if (!this.coinId) return;
    this.api
      .getGraphicalCurrencyData(this.coinId, this.currency, this.days)
      .subscribe((res: any) => {
        this.lineChartData.datasets[0].data = res.prices.map(
          (item: any) => item[1]
        );

        this.lineChartData.labels = res.prices.map((item: any) => {
          const date = new Date(item[0]);

          const time = `${date.getHours()}: ${date.getMinutes()}`;

          return this.days === 1 ? time : date.toLocaleDateString();
        });

        setTimeout(() => {
          this.myLineChart.update();
        }, 0);
      });
  }
}
