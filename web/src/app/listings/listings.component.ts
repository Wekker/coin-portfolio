import { Component, OnInit } from '@angular/core';
import { CoinService } from '../services/coin.service';
import { CoinModel } from '../models/CoinModel';

@Component({
  selector:    'app-listings',
  templateUrl: './listings.component.html',
  styleUrls:   ['./listings.component.scss'],
})
export class ListingsComponent implements OnInit {

  element: CoinModel;
  coinList: CoinModel[];
  headerName                 = {
    symbol:           'symbol',
    name:             'name',
    price:            'price',
    twentyFourChange: '\u0025 24h',
    sevenDayChange:   '\u0025 7d',
    thirtyDayChange:  '\u0025 30d',
    ninetyDayChange:  '\u0025 90d',
  };
  headerNames                = Object.values(this.headerName);
  digitsInfoPercentageChange = '1.2-2';
  selectedCurrency: 'EUR'    = 'EUR';

  constructor(private coinService: CoinService) {
  }

  ngOnInit(): void {
    this.getLatestCoinListings();
  }

  getLatestCoinListings(): void {
    this.coinService.getLatestCoinListings().subscribe((coins) => {
      this.coinList = coins;
    });
  }

  getCoinDisplayValue(coinModel: { [index: string]: any }, name: string): string {
    return (typeof coinModel[name] === 'undefined') ? coinModel.quote[this.selectedCurrency][name] : coinModel[name];
  }

  getTypedElement(element: { name: string }): CoinModel {
    return element as CoinModel;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
