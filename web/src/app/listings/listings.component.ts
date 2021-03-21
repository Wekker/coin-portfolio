import { Component, OnInit } from '@angular/core';
import { CoinService } from '../services/coin.service';
import { CoinModel } from '../models/CoinModel';

@Component({
  selector:    'app-listings',
  templateUrl: './listings.component.html',
  styleUrls:   ['./listings.component.scss'],
})
export class ListingsComponent implements OnInit {

  coinList: CoinModel[];
  tableColumnNames: string[] = ['name', 'symbol', 'price', 'percent_change_1h', 'percent_change_24h', 'percent_change_7d', 'percent_change_30d', 'percent_change_60d', 'percent_change_90d', 'last_updated'];
  selectedCurrency: 'EUR'    = 'EUR';

  constructor(private coinService: CoinService) {
  }

  ngOnInit(): void {
    this.getLatestCoinListings();
  }

  getLatestCoinListings(): void {
    this.coinService.getLatestCoinListings().subscribe((coins) => {
      this.coinList = coins;
      console.log('test', coins);
    });
  }

  getCoinDisplayValue(coinModel: { [index: string]: any }, name: string): string {
    return (typeof coinModel[name] === 'undefined') ? coinModel.quote[this.selectedCurrency][name] : coinModel[name];
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
