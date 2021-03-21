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
  tableColumns = ['position', 'name', 'weight', 'symbol']
  // tableColumns: string[] = ['name', 'symbol', 'price', 'percent_change_1h', 'percent_change_24h', 'percent_change_7d', 'percent_change_30d', 'percent_change_60d', 'percent_change_90d', 'last_updated'];

  constructor(private coinService: CoinService) {
  }

  ngOnInit(): void {
    this.getLatestCoinListings();
    this.coinList = ELEMENT_DATA as any;
  }

  getLatestCoinListings(): void {
    this.coinService.getLatestCoinListings().subscribe((coins) => {
      this.coinList = coins;
      console.log('test', coins);
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
